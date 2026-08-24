package com.prajamitra.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prajamitra.dto.ApplicationRequestDTO;
import com.prajamitra.dto.ApplicationResponseDTO;
import com.prajamitra.dto.PublicTrackingResponseDTO;
import com.prajamitra.security.UserPrincipal;
import com.prajamitra.service.ApplicationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ApplicationService applicationService;

    private UsernamePasswordAuthenticationToken getTestAuthToken(Long userId) {
        UserPrincipal principal = new UserPrincipal(userId, "Citizen User", "test.user@example.com", "9876543210", "hashedpass", "ROLE_CITIZEN");
        return new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    }

    @Test
    void testSubmitApplication_Unauthenticated_Returns401() throws Exception {
        ApplicationRequestDTO req = new ApplicationRequestDTO();
        req.setServiceId(1L);
        req.setApplicantName("Ramesh Kumar");
        req.setApplicantPhone("9876543210");

        mockMvc.perform(post("/api/applications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testSubmitApplication_Authenticated_Returns201() throws Exception {
        ApplicationRequestDTO req = new ApplicationRequestDTO();
        req.setServiceId(1L);
        req.setApplicantName("Ramesh Kumar");
        req.setApplicantPhone("9876543210");
        req.setDistrict("Guntur");
        req.setMandal("Tenali");

        ApplicationResponseDTO res = new ApplicationResponseDTO();
        res.setId(1L);
        res.setApplicationNumber("PM-20260823-ABCD");
        res.setStatus("SUBMITTED");

        when(applicationService.submitApplication(any(), any())).thenReturn(res);

        mockMvc.perform(post("/api/applications")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(getTestAuthToken(1L)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.applicationNumber").value("PM-20260823-ABCD"));
    }

    @Test
    void testSubmitApplication_ValidationFailure_Returns400() throws Exception {
        ApplicationRequestDTO req = new ApplicationRequestDTO();
        // Missing required fields: serviceId, applicantName, applicantPhone

        mockMvc.perform(post("/api/applications")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(getTestAuthToken(1L)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
    }

    @Test
    void testGetMyApplications_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/applications/my")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testGetMyApplications_Authenticated_Returns200() throws Exception {
        ApplicationResponseDTO res = new ApplicationResponseDTO();
        res.setId(1L);
        res.setApplicationNumber("PM-20260823-ABCD");
        res.setStatus("SUBMITTED");

        when(applicationService.getMyApplications(any())).thenReturn(List.of(res));

        mockMvc.perform(get("/api/applications/my")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(getTestAuthToken(1L)))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].applicationNumber").value("PM-20260823-ABCD"));
    }

    @Test
    void testGetApplicationByNumber_UnauthorizedUser_Returns403() throws Exception {
        when(applicationService.getApplicationByNumber(eq("PM-20260823-ABCD"), any()))
                .thenThrow(new AccessDeniedException("You are not authorized to view this application"));

        mockMvc.perform(get("/api/applications/PM-20260823-ABCD")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(getTestAuthToken(2L)))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.status").value(403));
    }

    @Test
    void testPublicTracking_ReturnsNonSensitiveData_Returns200() throws Exception {
        PublicTrackingResponseDTO tracking = new PublicTrackingResponseDTO();
        tracking.setApplicationNumber("PM-20260823-ABCD");
        tracking.setServiceName("Adangal Viewing");
        tracking.setStatus("SUBMITTED");

        when(applicationService.getPublicTrackingInfo("PM-20260823-ABCD")).thenReturn(tracking);

        mockMvc.perform(get("/api/applications/track/PM-20260823-ABCD")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.applicationNumber").value("PM-20260823-ABCD"))
                .andExpect(jsonPath("$.data.status").value("SUBMITTED"));
    }
}
