package com.prajamitra.service;

import com.prajamitra.dto.BookmarkDTO;
import com.prajamitra.entity.BookmarkEntity;
import com.prajamitra.entity.ServiceEntity;
import com.prajamitra.entity.UserEntity;
import com.prajamitra.exception.ResourceNotFoundException;
import com.prajamitra.exception.UnauthorizedException;
import com.prajamitra.repository.BookmarkRepository;
import com.prajamitra.repository.ServiceRepository;
import com.prajamitra.repository.UserRepository;
import com.prajamitra.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository,
                           ServiceRepository serviceRepository,
                           UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<BookmarkDTO> getUserBookmarks(UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("Authentication is required to view bookmarks");
        }
        List<BookmarkEntity> list = bookmarkRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId());
        return list.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Transactional
    public BookmarkDTO addBookmark(Long serviceId, UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("User authentication required");
        }

        UserEntity user = userRepository.findById(currentUser.getId())
                .or(() -> userRepository.findByEmail(currentUser.getEmail()))
                .orElseThrow(() -> new UnauthorizedException("User account not found"));

        ServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Government Service", "id", serviceId));

        Optional<BookmarkEntity> existing = bookmarkRepository.findByUserIdAndServiceId(user.getId(), serviceId);
        if (existing.isPresent()) {
            return mapToDTO(existing.get());
        }

        BookmarkEntity bookmark = new BookmarkEntity(user, service);
        BookmarkEntity saved = bookmarkRepository.save(bookmark);
        return mapToDTO(saved);
    }

    @Transactional
    public void removeBookmark(Long serviceId, UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("User authentication required");
        }
        bookmarkRepository.deleteByUserIdAndServiceId(currentUser.getId(), serviceId);
    }

    @Transactional(readOnly = true)
    public boolean isBookmarked(Long serviceId, UserPrincipal currentUser) {
        if (currentUser == null) return false;
        return bookmarkRepository.existsByUserIdAndServiceId(currentUser.getId(), serviceId);
    }

    private BookmarkDTO mapToDTO(BookmarkEntity entity) {
        if (entity == null) return null;
        BookmarkDTO dto = new BookmarkDTO();
        dto.setId(entity.getId());
        if (entity.getService() != null) {
            dto.setServiceId(entity.getService().getId());
            dto.setServiceCode(entity.getService().getServiceCode());
            dto.setServiceName(entity.getService().getName());
            dto.setServiceNameTe(entity.getService().getNameTe());
            dto.setTimeline(entity.getService().getTimeline());
            dto.setFees(entity.getService().getFees());
            if (entity.getService().getCategory() != null) {
                dto.setCategoryName(entity.getService().getCategory().getName());
                dto.setCategoryNameTe(entity.getService().getCategory().getNameTe());
            }
        }
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
