package com.prajamitra.controller;

import com.prajamitra.dto.ApiResponse;
import com.prajamitra.dto.PagedResponse;
import com.prajamitra.dto.ServiceCategoryDTO;
import com.prajamitra.dto.ServiceDTO;
import com.prajamitra.service.GovernmentServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ServiceController {

    private final GovernmentServiceService serviceService;

    public ServiceController(GovernmentServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping("/services")
    public ResponseEntity<ApiResponse<PagedResponse<ServiceDTO>>> getServices(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        PagedResponse<ServiceDTO> result = serviceService.getServices(category, search, page, size);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/services/{id:[0-9]+}")
    public ResponseEntity<ApiResponse<ServiceDTO>> getServiceById(@PathVariable Long id) {
        ServiceDTO result = serviceService.getServiceById(id);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/services/code/{serviceCode}")
    public ResponseEntity<ApiResponse<ServiceDTO>> getServiceByCode(@PathVariable String serviceCode) {
        ServiceDTO result = serviceService.getServiceByCode(serviceCode);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<ServiceCategoryDTO>>> getCategories() {
        List<ServiceCategoryDTO> categories = serviceService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.ok(categories));
    }
}
