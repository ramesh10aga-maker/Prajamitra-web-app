package com.prajamitra.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "services")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private ServiceCategoryEntity category;

    @Column(name = "service_code", nullable = false, unique = true, length = 100)
    private String serviceCode;

    @Column(nullable = false)
    private String name;

    @Column(name = "name_te", nullable = false)
    private String nameTe;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "description_te", columnDefinition = "TEXT")
    private String descriptionTe;

    @Column(columnDefinition = "TEXT")
    private String eligibility;

    @Column(columnDefinition = "TEXT")
    private String documents;

    @Column(columnDefinition = "TEXT")
    private String process;

    @Column(length = 100)
    private String fees;

    @Column(length = 100)
    private String timeline;

    @Column(name = "official_url", length = 500)
    private String officialUrl;

    @Column(length = 255)
    private String source;

    @Column
    private Boolean verified = false;

    @Column(name = "last_verified_at")
    private OffsetDateTime lastVerifiedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    public ServiceEntity() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ServiceCategoryEntity getCategory() { return category; }
    public void setCategory(ServiceCategoryEntity category) { this.category = category; }

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

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
