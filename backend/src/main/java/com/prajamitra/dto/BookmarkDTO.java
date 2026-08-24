package com.prajamitra.dto;

import java.time.OffsetDateTime;

public class BookmarkDTO {

    private Long id;
    private Long serviceId;
    private String serviceCode;
    private String serviceName;
    private String serviceNameTe;
    private String categoryName;
    private String categoryNameTe;
    private String timeline;
    private String fees;
    private OffsetDateTime createdAt;

    public BookmarkDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public String getCategoryNameTe() { return categoryNameTe; }
    public void setCategoryNameTe(String categoryNameTe) { this.categoryNameTe = categoryNameTe; }

    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }

    public String getFees() { return fees; }
    public void setFees(String fees) { this.fees = fees; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
