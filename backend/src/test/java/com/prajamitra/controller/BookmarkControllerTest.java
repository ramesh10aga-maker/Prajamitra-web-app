package com.prajamitra.controller;

import com.prajamitra.dto.BookmarkDTO;
import com.prajamitra.security.UserPrincipal;
import com.prajamitra.service.BookmarkService;
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

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BookmarkControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookmarkService bookmarkService;

    private UsernamePasswordAuthenticationToken getTestAuthToken(Long userId) {
        UserPrincipal principal = new UserPrincipal(userId, "Citizen User", "test.user@example.com", "9876543210", "hashedpass", "ROLE_CITIZEN");
        return new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    }

    @Test
    void testGetBookmarks_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/bookmarks")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testGetBookmarks_Authenticated_Returns200() throws Exception {
        BookmarkDTO dto = new BookmarkDTO();
        dto.setId(1L);
        dto.setServiceId(1L);
        dto.setServiceName("Adangal Viewing");

        when(bookmarkService.getUserBookmarks(any())).thenReturn(List.of(dto));

        mockMvc.perform(get("/api/bookmarks")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(getTestAuthToken(1L)))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].serviceName").value("Adangal Viewing"));
    }

    @Test
    void testAddBookmark_Authenticated_Returns201() throws Exception {
        BookmarkDTO dto = new BookmarkDTO();
        dto.setId(1L);
        dto.setServiceId(1L);
        dto.setServiceName("Adangal Viewing");

        when(bookmarkService.addBookmark(eq(1L), any())).thenReturn(dto);

        mockMvc.perform(post("/api/bookmarks/1")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(getTestAuthToken(1L)))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.serviceId").value(1));
    }

    @Test
    void testRemoveBookmark_Authenticated_Returns200() throws Exception {
        mockMvc.perform(delete("/api/bookmarks/1")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(getTestAuthToken(1L)))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
