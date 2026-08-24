package com.prajamitra.dto;

import java.time.OffsetDateTime;

public class ServiceDTO {
    private Long id;
    private Long categoryId;
    private String categoryName;
    private String categoryNameTe;
    private String serviceCode;
    private String name;
    private String nameTe;
    private String description;
    private String descriptionTe;
    private String eligibility;
    private String documents;
    private String process;
    private String fees;
    private String timeline;
    private String officialUrl;
    private String source;
    private Boolean verified;
    private OffsetDateTime lastVerifiedAt;
    private OffsetDateTime createdAt;

    public ServiceDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getCategoryNameTe() { return categoryNameTe; }
    public void setCategoryNameTe(String categoryNameTe) { this.categoryNameTe = categoryNameTe; }

    public String getServiceCode() { return serviceCode; }
    public void setServiceCode(String serviceCode) { this.serviceCode = serviceCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameTe() { return nameTe; }
    public void setNameTe(String nameTe) { this.nameTe = nameTe; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDescriptionTe() { return descriptionTe; }
    public void setDescriptionTe(String descriptionTe) { this.descriptionTe = descriptionTe; }

    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }

    public String getDocuments() { return documents; }
    public void setDocuments(String documents) { this.documents = documents; }

    public String getProcess() { return process; }
    public void setProcess(String process) { this.process = process; }

    public String getFees() { return fees; }
    public void setFees(String fees) { this.fees = fees; }

    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }

    public String getOfficialUrl() { return officialUrl; }
    public void setOfficialUrl(String officialUrl) { this.officialUrl = officialUrl; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }

    public OffsetDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(OffsetDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
