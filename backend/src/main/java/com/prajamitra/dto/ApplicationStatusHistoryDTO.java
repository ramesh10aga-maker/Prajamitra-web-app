package com.prajamitra.dto;

import java.time.OffsetDateTime;

public class ApplicationStatusHistoryDTO {

    private Long id;
    private String status;
    private String remarks;
    private OffsetDateTime changedAt;
    private String changedBy;

    public ApplicationStatusHistoryDTO() {}

    public ApplicationStatusHistoryDTO(Long id, String status, String remarks, OffsetDateTime changedAt, String changedBy) {
        this.id = id;
        this.status = status;
        this.remarks = remarks;
        this.changedAt = changedAt;
        this.changedBy = changedBy;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public OffsetDateTime getChangedAt() { return changedAt; }
    public void setChangedAt(OffsetDateTime changedAt) { this.changedAt = changedAt; }

    public String getChangedBy() { return changedBy; }
    public void setChangedBy(String changedBy) { this.changedBy = changedBy; }
}
