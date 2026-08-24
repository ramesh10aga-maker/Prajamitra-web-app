package com.prajamitra.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ApplicationRequestDTO {

    @NotNull(message = "Service ID is required")
    private Long serviceId;

    @NotBlank(message = "Applicant name is required")
    @Size(min = 2, max = 255, message = "Applicant name must be between 2 and 255 characters")
    private String applicantName;

    @NotBlank(message = "Applicant phone number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Please enter a valid 10-digit Indian mobile number")
    private String applicantPhone;

    private String applicantEmail;

    private String aadhaarMasked;

    private String district;

    private String mandal;

    private String village;

    private String details;

    public ApplicationRequestDTO() {}

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

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
}
