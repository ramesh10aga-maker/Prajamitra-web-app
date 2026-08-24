package com.prajamitra.controller;

import com.prajamitra.dto.ApiResponse;
import com.prajamitra.dto.UserDTO;
import com.prajamitra.security.UserPrincipal;
import com.prajamitra.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        UserDTO user = userService.getUserProfile(currentUser);
        return ResponseEntity.ok(ApiResponse.ok(user));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> updateCurrentUser(
            @RequestBody UserDTO userDTO,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        UserDTO updated = userService.updateUserProfile(userDTO, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("User profile updated successfully", updated));
    }
}
