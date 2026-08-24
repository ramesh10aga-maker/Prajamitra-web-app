package com.prajamitra.service;

import com.prajamitra.dto.PagedResponse;
import com.prajamitra.dto.ServiceCategoryDTO;
import com.prajamitra.dto.ServiceDTO;
import com.prajamitra.entity.ServiceCategoryEntity;
import com.prajamitra.entity.ServiceEntity;
import com.prajamitra.exception.ResourceNotFoundException;
import com.prajamitra.repository.ServiceCategoryRepository;
import com.prajamitra.repository.ServiceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GovernmentServiceService {

    private final ServiceRepository serviceRepository;
    private final ServiceCategoryRepository categoryRepository;

    public GovernmentServiceService(ServiceRepository serviceRepository, ServiceCategoryRepository categoryRepository) {
        this.serviceRepository = serviceRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public PagedResponse<ServiceDTO> getServices(String category, String search, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, size), Sort.by("id").ascending());
        Page<ServiceEntity> entityPage;

        if (StringUtils.hasText(category) && !"all".equalsIgnoreCase(category)) {
            if (StringUtils.hasText(search)) {
                entityPage = serviceRepository.findByCategoryAndQuery(category, search.trim(), pageable);
            } else {
                entityPage = serviceRepository.findByCategoryName(category.trim(), pageable);
            }
        } else if (StringUtils.hasText(search)) {
            entityPage = serviceRepository.searchServices(search.trim(), pageable);
        } else {
            entityPage = serviceRepository.findAll(pageable);
        }

        List<ServiceDTO> dtoList = entityPage.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return new PagedResponse<>(
                dtoList,
                entityPage.getNumber(),
                entityPage.getSize(),
                entityPage.getTotalElements(),
                entityPage.getTotalPages(),
                entityPage.isLast()
        );
    }

    @Transactional(readOnly = true)
    public List<ServiceDTO> getAllServicesList(String category, String search) {
        Pageable pageable = PageRequest.of(0, 100, Sort.by("id").ascending());
        return getServices(category, search, 0, 100).getContent();
    }

    @Transactional(readOnly = true)
    public ServiceDTO getServiceById(Long id) {
        ServiceEntity entity = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", id));
        return mapToDTO(entity);
    }

    @Transactional(readOnly = true)
    public ServiceDTO getServiceByCode(String serviceCode) {
        ServiceEntity entity = serviceRepository.findByServiceCode(serviceCode)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "serviceCode", serviceCode));
        return mapToDTO(entity);
    }

    @Transactional(readOnly = true)
    public PagedResponse<ServiceDTO> getServicesByCategory(String category, int page, int size) {
        return getServices(category, null, page, size);
    }

    @Transactional(readOnly = true)
    public PagedResponse<ServiceDTO> searchServices(String query, int page, int size) {
        return getServices(null, query, page, size);
    }

    @Transactional(readOnly = true)
    public List<ServiceCategoryDTO> getAllCategories() {
        return categoryRepository.findAll(Sort.by("id").ascending()).stream()
                .map(cat -> new ServiceCategoryDTO(
                        cat.getId(),
                        cat.getName(),
                        cat.getNameTe(),
                        cat.getDescription(),
                        cat.getServices() != null ? cat.getServices().size() : 0
                ))
                .collect(Collectors.toList());
    }

    public ServiceDTO mapToDTO(ServiceEntity entity) {
        if (entity == null) return null;
        ServiceDTO dto = new ServiceDTO();
        dto.setId(entity.getId());
        if (entity.getCategory() != null) {
            dto.setCategoryId(entity.getCategory().getId());
            dto.setCategoryName(entity.getCategory().getName());
            dto.setCategoryNameTe(entity.getCategory().getNameTe());
        }
        dto.setServiceCode(entity.getServiceCode());
        dto.setName(entity.getName());
        dto.setNameTe(entity.getNameTe());
        dto.setDescription(entity.getDescription());
        dto.setDescriptionTe(entity.getDescriptionTe());
        dto.setEligibility(entity.getEligibility());
        dto.setDocuments(entity.getDocuments());
        dto.setProcess(entity.getProcess());
        dto.setFees(entity.getFees());
        dto.setTimeline(entity.getTimeline());
        dto.setOfficialUrl(entity.getOfficialUrl());
        dto.setSource(entity.getSource());
        dto.setVerified(entity.getVerified());
        dto.setLastVerifiedAt(entity.getLastVerifiedAt());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
