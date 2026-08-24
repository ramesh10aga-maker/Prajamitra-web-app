package com.prajamitra.controller;

import com.prajamitra.dto.ApiResponse;
import com.prajamitra.dto.BookmarkDTO;
import com.prajamitra.security.UserPrincipal;
import com.prajamitra.service.BookmarkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookmarkDTO>>> getBookmarks(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        List<BookmarkDTO> bookmarks = bookmarkService.getUserBookmarks(currentUser);
        return ResponseEntity.ok(ApiResponse.ok(bookmarks));
    }

    @PostMapping("/{serviceId:[0-9]+}")
    public ResponseEntity<ApiResponse<BookmarkDTO>> addBookmark(
            @PathVariable Long serviceId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        BookmarkDTO bookmark = bookmarkService.addBookmark(serviceId, currentUser);
        return new ResponseEntity<>(ApiResponse.ok("Service bookmarked successfully", bookmark), HttpStatus.CREATED);
    }

    @DeleteMapping("/{serviceId:[0-9]+}")
    public ResponseEntity<ApiResponse<Void>> removeBookmark(
            @PathVariable Long serviceId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        bookmarkService.removeBookmark(serviceId, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("Bookmark removed successfully", null));
    }

    @GetMapping("/check/{serviceId:[0-9]+}")
    public ResponseEntity<ApiResponse<Boolean>> checkBookmark(
            @PathVariable Long serviceId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        boolean bookmarked = bookmarkService.isBookmarked(serviceId, currentUser);
        return ResponseEntity.ok(ApiResponse.ok(bookmarked));
    }
}
