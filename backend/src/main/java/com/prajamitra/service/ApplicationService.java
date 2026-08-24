package com.prajamitra.service;

import com.prajamitra.dto.ApplicationRequestDTO;
import com.prajamitra.dto.ApplicationResponseDTO;
import com.prajamitra.dto.ApplicationStatusHistoryDTO;
import com.prajamitra.dto.PublicTrackingResponseDTO;
import com.prajamitra.entity.ApplicationEntity;
import com.prajamitra.entity.ApplicationStatusHistoryEntity;
import com.prajamitra.entity.AuditLogEntity;
import com.prajamitra.entity.ServiceEntity;
import com.prajamitra.entity.UserEntity;
import com.prajamitra.exception.BadRequestException;
import com.prajamitra.exception.ResourceNotFoundException;
import com.prajamitra.exception.UnauthorizedException;
import com.prajamitra.repository.ApplicationRepository;
import com.prajamitra.repository.ApplicationStatusHistoryRepository;
import com.prajamitra.repository.AuditLogRepository;
import com.prajamitra.repository.ServiceRepository;
import com.prajamitra.repository.UserRepository;
import com.prajamitra.security.UserPrincipal;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationStatusHistoryRepository statusHistoryRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              ApplicationStatusHistoryRepository statusHistoryRepository,
                              ServiceRepository serviceRepository,
                              UserRepository userRepository,
                              AuditLogRepository auditLogRepository) {
        this.applicationRepository = applicationRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public ApplicationResponseDTO submitApplication(ApplicationRequestDTO request, UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("Authentication is required to submit a government service application");
        }

        if (request.getServiceId() == null) {
            throw new BadRequestException("Service ID is mandatory");
        }

        ServiceEntity service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Government Service", "id", request.getServiceId()));

        UserEntity user = userRepository.findById(currentUser.getId())
                .or(() -> userRepository.findByEmail(currentUser.getEmail()))
                .orElseThrow(() -> new UnauthorizedException("User account not found"));

        String appNumber = generateUniqueApplicationNumber();

        ApplicationEntity application = new ApplicationEntity();
        application.setApplicationNumber(appNumber);
        application.setUser(user);
        application.setService(service);
        application.setApplicantName(request.getApplicantName().trim());
        application.setApplicantPhone(request.getApplicantPhone().trim());
        application.setApplicantEmail(request.getApplicantEmail() != null ? request.getApplicantEmail().trim() : user.getEmail());
        application.setAadhaarMasked(request.getAadhaarMasked() != null ? request.getAadhaarMasked().trim() : null);
        application.setDistrict(request.getDistrict());
        application.setMandal(request.getMandal());
        application.setVillage(request.getVillage());
        application.setDetails(request.getDetails());
        application.setStatus("SUBMITTED");

        ApplicationEntity savedApp = applicationRepository.save(application);

        ApplicationStatusHistoryEntity initialHistory = new ApplicationStatusHistoryEntity(
                savedApp,
                "SUBMITTED",
                "Application received and registered successfully on PrajaMitra portal.",
                "CITIZEN"
        );
        statusHistoryRepository.save(initialHistory);
        savedApp.addStatusHistory(initialHistory);

        // Audit log
        AuditLogEntity auditLog = new AuditLogEntity(user, "APPLICATION_SUBMITTED", "APPLICATION", appNumber);
        auditLogRepository.save(auditLog);

        return mapToDTO(savedApp);
    }

    @Transactional(readOnly = true)
    public ApplicationResponseDTO getApplicationByNumber(String applicationNumber, UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("Authentication is required to view full application details");
        }

        ApplicationEntity application = applicationRepository.findByApplicationNumber(applicationNumber.trim().toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Application", "applicationNumber", applicationNumber));

        if (application.getUser() != null && !currentUser.getId().equals(application.getUser().getId())) {
            throw new AccessDeniedException("You are not authorized to view this application");
        }

        return mapToDTO(application);
    }

    @Transactional(readOnly = true)
    public PublicTrackingResponseDTO getPublicTrackingInfo(String applicationNumber) {
        ApplicationEntity application = applicationRepository.findByApplicationNumber(applicationNumber.trim().toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Application", "applicationNumber", applicationNumber));

        return mapToPublicTrackingDTO(application);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getMyApplications(UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("Authentication is required to view user applications");
        }

        List<ApplicationEntity> list = applicationRepository.findByUserIdOrderBySubmittedAtDesc(currentUser.getId());
        return list.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Transactional
    public ApplicationResponseDTO updateApplicationStatus(String applicationNumber, String newStatus, String remarks, String changedBy) {
        ApplicationEntity application = applicationRepository.findByApplicationNumber(applicationNumber.trim().toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Application", "applicationNumber", applicationNumber));

        application.setStatus(newStatus);
        ApplicationStatusHistoryEntity history = new ApplicationStatusHistoryEntity(
                application,
                newStatus,
                remarks,
                changedBy != null ? changedBy : "OFFICER"
        );
        statusHistoryRepository.save(history);
        application.addStatusHistory(history);

        ApplicationEntity updated = applicationRepository.save(application);
        return mapToDTO(updated);
    }

    private String generateUniqueApplicationNumber() {
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String randomPart = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        String appNumber = "PM-" + datePart + "-" + randomPart;

        while (applicationRepository.existsByApplicationNumber(appNumber)) {
            randomPart = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
            appNumber = "PM-" + datePart + "-" + randomPart;
        }
        return appNumber;
    }

    public ApplicationResponseDTO mapToDTO(ApplicationEntity entity) {
        if (entity == null) return null;
        ApplicationResponseDTO dto = new ApplicationResponseDTO();
        dto.setId(entity.getId());
        dto.setApplicationNumber(entity.getApplicationNumber());
        if (entity.getService() != null) {
            dto.setServiceId(entity.getService().getId());
            dto.setServiceCode(entity.getService().getServiceCode());
            dto.setServiceName(entity.getService().getName());
            dto.setServiceNameTe(entity.getService().getNameTe());
            if (entity.getService().getCategory() != null) {
                dto.setCategoryName(entity.getService().getCategory().getName());
            }
        }
        dto.setApplicantName(entity.getApplicantName());
        dto.setApplicantPhone(entity.getApplicantPhone());
        dto.setApplicantEmail(entity.getApplicantEmail());
        dto.setAadhaarMasked(entity.getAadhaarMasked());
        dto.setDistrict(entity.getDistrict());
        dto.setMandal(entity.getMandal());
        dto.setVillage(entity.getVillage());
        dto.setDetails(entity.getDetails());
        dto.setStatus(entity.getStatus());
        dto.setSubmittedAt(entity.getSubmittedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        if (entity.getStatusHistory() != null) {
            dto.setStatusHistory(entity.getStatusHistory().stream()
                    .map(h -> new ApplicationStatusHistoryDTO(
                            h.getId(),
                            h.getStatus(),
                            h.getRemarks(),
                            h.getChangedAt(),
                            h.getChangedBy()
                    ))
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    public PublicTrackingResponseDTO mapToPublicTrackingDTO(ApplicationEntity entity) {
        if (entity == null) return null;
        PublicTrackingResponseDTO dto = new PublicTrackingResponseDTO();
        dto.setApplicationNumber(entity.getApplicationNumber());
        if (entity.getService() != null) {
            dto.setServiceId(entity.getService().getId());
            dto.setServiceCode(entity.getService().getServiceCode());
            dto.setServiceName(entity.getService().getName());
            dto.setServiceNameTe(entity.getService().getNameTe());
            if (entity.getService().getCategory() != null) {
                dto.setCategoryName(entity.getService().getCategory().getName());
                dto.setCategoryNameTe(entity.getService().getCategory().getNameTe());
            }
        }
        dto.setStatus(entity.getStatus());
        dto.setSubmittedAt(entity.getSubmittedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        if (entity.getStatusHistory() != null) {
            dto.setStatusHistory(entity.getStatusHistory().stream()
                    .map(h -> new ApplicationStatusHistoryDTO(
                            h.getId(),
                            h.getStatus(),
                            h.getRemarks(),
                            h.getChangedAt(),
                            h.getChangedBy()
                    ))
                    .collect(Collectors.toList()));
        }
        return dto;
    }
}
