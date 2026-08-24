package com.prajamitra.controller;

import com.prajamitra.dto.ApiResponse;
import com.prajamitra.dto.LandConversionRequestDTO;
import com.prajamitra.dto.LandConversionResponseDTO;
import com.prajamitra.service.LandToolsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/land")
public class LandToolsController {

    private final LandToolsService landToolsService;

    public LandToolsController(LandToolsService landToolsService) {
        this.landToolsService = landToolsService;
    }

    @PostMapping("/convert")
    public ResponseEntity<ApiResponse<LandConversionResponseDTO>> convertLandUnits(
            @Valid @RequestBody LandConversionRequestDTO request) {
        LandConversionResponseDTO result = landToolsService.convertLandUnits(request);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}
