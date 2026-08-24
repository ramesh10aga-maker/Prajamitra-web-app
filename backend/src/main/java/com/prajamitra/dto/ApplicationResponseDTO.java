package com.prajamitra.dto;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

public class ApplicationResponseDTO {

    private Long id;
    private String applicationNumber;
    private Long serviceId;
    private String serviceCode;
    private String serviceName;
    private String serviceNameTe;
    private String categoryName;
    private String applicantName;
    private String applicantPhone;
    private String applicantEmail;
    private String aadhaarMasked;
    private String district;
    private String mandal;
    private String village;
    private String details;
    private String status;
    private OffsetDateTime submittedAt;
    private OffsetDateTime updatedAt;
    private List<ApplicationStatusHistoryDTO> statusHistory = new ArrayList<>();

    public ApplicationResponseDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getApplicationNumber() { return applicationNumber; }
    public void setApplicationNumber(String applicationNumber) { this.applicationNumber = applicationNumber; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public String getServiceCode() { return serviceCode; }
    public void setServiceCode(String serviceCode) { this.serviceCode = serviceCode; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public String getServiceNameTe() { return serviceNameTe; }
    public void setServiceNameTe(String serviceNameTe) { this.serviceNameTe = serviceNameTe; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getApplicantName() { return applicantName; }
    public void setApplicantName(String applicantName) { this.applicantName = applicantName; }

    public String getApplicantPhone() { return applicantPhone; }
    public void setApplicantPhone(String applicantPhone) { this.applicantPhone = applicantPhone; }

    public String getApplicantEmail() { return applicantEmail; }
    public void setApplicantEmail(String applicantEmail) { this.applicantEmail = applicantEmail; }

    public String getAadhaarMasked() { return aadhaarMasked; }
    public void setAadhaarMasked(String aadhaarMasked) { this.aadhaarMasked = aadhaarMasked; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getMandal() { return mandal; }
    public void setMandal(String mandal) { this.mandal = mandal; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(OffsetDateTime submittedAt) { this.submittedAt = submittedAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<ApplicationStatusHistoryDTO> getStatusHistory() { return statusHistory; }
    public void setStatusHistory(List<ApplicationStatusHistoryDTO> statusHistory) { this.statusHistory = statusHistory; }
}
