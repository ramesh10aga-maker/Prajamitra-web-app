package com.prajamitra.controller;

import com.prajamitra.dto.PagedResponse;
import com.prajamitra.dto.ServiceCategoryDTO;
import com.prajamitra.dto.ServiceDTO;
import com.prajamitra.exception.ResourceNotFoundException;
import com.prajamitra.service.GovernmentServiceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ServiceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GovernmentServiceService serviceService;

    @Test
    void testGetServices_PublicEndpoint_Returns200() throws Exception {
        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(1L);
        serviceDTO.setServiceCode("AP-REV-001");
        serviceDTO.setName("Adangal Viewing");
        serviceDTO.setNameTe("అడంగల్ పరిశీలన");

        PagedResponse<ServiceDTO> pagedResponse = new PagedResponse<>(
                List.of(serviceDTO), 0, 50, 1L, 1, true
        );

        when(serviceService.getServices(any(), any(), anyInt(), anyInt())).thenReturn(pagedResponse);

        mockMvc.perform(get("/api/services")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content[0].serviceCode").value("AP-REV-001"))
                .andExpect(jsonPath("$.data.totalElements").value(1));
    }

    @Test
    void testGetServiceById_Found_Returns200() throws Exception {
        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(1L);
        serviceDTO.setServiceCode("AP-REV-001");
        serviceDTO.setName("Adangal Viewing");
        serviceDTO.setNameTe("అడంగల్ పరిశీలన");

        when(serviceService.getServiceById(1L)).thenReturn(serviceDTO);

        mockMvc.perform(get("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Adangal Viewing"));
    }

    @Test
    void testGetServiceById_NotFound_Returns404() throws Exception {
        when(serviceService.getServiceById(999L))
                .thenThrow(new ResourceNotFoundException("Government Service", "id", 999L));

        mockMvc.perform(get("/api/services/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }

    @Test
    void testGetCategories_PublicEndpoint_Returns200() throws Exception {
        ServiceCategoryDTO cat = new ServiceCategoryDTO(1L, "Revenue", "రెవెన్యూ", "Land & Revenue", 5);
        when(serviceService.getAllCategories()).thenReturn(List.of(cat));

        mockMvc.perform(get("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].name").value("Revenue"));
    }
}
