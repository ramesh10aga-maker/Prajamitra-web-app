package com.prajamitra.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prajamitra.dto.AuthRequestDTO;
import com.prajamitra.dto.AuthResponseDTO;
import com.prajamitra.dto.RegisterRequestDTO;
import com.prajamitra.dto.UserDTO;
import com.prajamitra.exception.BadRequestException;
import com.prajamitra.exception.UnauthorizedException;
import com.prajamitra.security.UserPrincipal;
import com.prajamitra.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @Test
    void testRegister_Success_Returns201() throws Exception {
        RegisterRequestDTO req = new RegisterRequestDTO("Ramesh Kumar", "test.user@example.com", "9876543210", "TestPassword123!");
        UserDTO user = new UserDTO(1L, "Ramesh Kumar", "test.user@example.com", "9876543210", "ROLE_CITIZEN", "Guntur", "Tenali", "Angalakuduru", null);
        AuthResponseDTO res = new AuthResponseDTO("mock-jwt-token", 86400000L, user);

        when(authService.register(any())).thenReturn(res);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").value("mock-jwt-token"))
                .andExpect(jsonPath("$.data.user.email").value("test.user@example.com"));
    }

    @Test
    void testRegister_DuplicateEmail_Returns400() throws Exception {
        RegisterRequestDTO req = new RegisterRequestDTO("Ramesh Kumar", "test.user@example.com", "9876543210", "TestPassword123!");
        when(authService.register(any())).thenThrow(new BadRequestException("Email is already registered"));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
    }

    @Test
    void testLogin_Success_Returns200() throws Exception {
        AuthRequestDTO req = new AuthRequestDTO("test.user@example.com", "TestPassword123!");
        UserDTO user = new UserDTO(1L, "Ramesh Kumar", "test.user@example.com", "9876543210", "ROLE_CITIZEN", "Guntur", "Tenali", "Angalakuduru", null);
        AuthResponseDTO res = new AuthResponseDTO("mock-jwt-token", 86400000L, user);

        when(authService.login(any())).thenReturn(res);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").value("mock-jwt-token"));
    }

    @Test
    void testLogin_InvalidCredentials_Returns401() throws Exception {
        AuthRequestDTO req = new AuthRequestDTO("test.user@example.com", "WrongPassword");
        when(authService.login(any())).thenThrow(new UnauthorizedException("Invalid email or password"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    void testGetCurrentUser_Authenticated_Returns200() throws Exception {
        UserDTO user = new UserDTO(1L, "Ramesh Kumar", "test.user@example.com", "9876543210", "ROLE_CITIZEN", "Guntur", "Tenali", "Angalakuduru", null);
        when(authService.getCurrentUser(any())).thenReturn(user);

        UserPrincipal principal = new UserPrincipal(1L, "Ramesh Kumar", "test.user@example.com", "9876543210", "hash", "ROLE_CITIZEN");
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

        mockMvc.perform(get("/api/auth/me")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(auth))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value("test.user@example.com"));
    }
}
