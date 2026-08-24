package com.prajamitra.dto;

import java.time.OffsetDateTime;
import java.util.List;

public class PublicTrackingResponseDTO {

    private String applicationNumber;
    private Long serviceId;
    private String serviceCode;
    private String serviceName;
    private String serviceNameTe;
    private String categoryName;
    private String categoryNameTe;
    private String status;
    private OffsetDateTime submittedAt;
    private OffsetDateTime updatedAt;
    private List<ApplicationStatusHistoryDTO> statusHistory;

    public PublicTrackingResponseDTO() {}

    public String getApplicationNumber() {
        return applicationNumber;
    }

    public void setApplicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceNameTe() {
        return serviceNameTe;
    }

    public void setServiceNameTe(String serviceNameTe) {
        this.serviceNameTe = serviceNameTe;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryNameTe() {
        return categoryNameTe;
    }

    public void setCategoryNameTe(String categoryNameTe) {
        this.categoryNameTe = categoryNameTe;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OffsetDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(OffsetDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<ApplicationStatusHistoryDTO> getStatusHistory() {
        return statusHistory;
    }

    public void setStatusHistory(List<ApplicationStatusHistoryDTO> statusHistory) {
        this.statusHistory = statusHistory;
    }
}
