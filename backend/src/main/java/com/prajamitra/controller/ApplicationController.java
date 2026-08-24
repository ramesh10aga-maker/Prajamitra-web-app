package com.prajamitra.controller;

import com.prajamitra.dto.ApiResponse;
import com.prajamitra.dto.ApplicationRequestDTO;
import com.prajamitra.dto.ApplicationResponseDTO;
import com.prajamitra.dto.PublicTrackingResponseDTO;
import com.prajamitra.security.UserPrincipal;
import com.prajamitra.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ApplicationResponseDTO>> submitApplication(
            @Valid @RequestBody ApplicationRequestDTO request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        ApplicationResponseDTO response = applicationService.submitApplication(request, currentUser);
        return new ResponseEntity<>(ApiResponse.ok("Application submitted successfully", response), HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ApplicationResponseDTO>>> getMyApplications(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        List<ApplicationResponseDTO> applications = applicationService.getMyApplications(currentUser);
        return ResponseEntity.ok(ApiResponse.ok(applications));
    }

    @GetMapping("/{applicationNumber:[A-Za-z0-9-]+}")
    public ResponseEntity<ApiResponse<ApplicationResponseDTO>> getApplicationByNumber(
            @PathVariable String applicationNumber,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        ApplicationResponseDTO response = applicationService.getApplicationByNumber(applicationNumber, currentUser);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/track/{applicationNumber:[A-Za-z0-9-]+}")
    public ResponseEntity<ApiResponse<PublicTrackingResponseDTO>> trackApplication(
            @PathVariable String applicationNumber) {
        PublicTrackingResponseDTO response = applicationService.getPublicTrackingInfo(applicationNumber);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
