package com.prajamitra.service;

import com.prajamitra.dto.UserDTO;
import com.prajamitra.entity.UserEntity;
import com.prajamitra.exception.ResourceNotFoundException;
import com.prajamitra.exception.UnauthorizedException;
import com.prajamitra.repository.UserRepository;
import com.prajamitra.security.UserPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserDTO getUserProfile(UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("User is not authenticated");
        }
        UserEntity user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));

        return mapToDTO(user);
    }

    @Transactional
    public UserDTO updateUserProfile(UserDTO updateDTO, UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("User is not authenticated");
        }
        UserEntity user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));

        if (updateDTO.getName() != null && !updateDTO.getName().trim().isEmpty()) {
            user.setName(updateDTO.getName().trim());
        }
        if (updateDTO.getPhone() != null && !updateDTO.getPhone().trim().isEmpty()) {
            user.setPhone(updateDTO.getPhone().trim());
        }
        if (updateDTO.getDistrict() != null) {
            user.setDistrict(updateDTO.getDistrict());
        }
        if (updateDTO.getMandal() != null) {
            user.setMandal(updateDTO.getMandal());
        }
        if (updateDTO.getVillage() != null) {
            user.setVillage(updateDTO.getVillage());
        }

        UserEntity saved = userRepository.save(user);
        return mapToDTO(saved);
    }

    private UserDTO mapToDTO(UserEntity user) {
        if (user == null) return null;
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getDistrict(),
                user.getMandal(),
                user.getVillage(),
                user.getCreatedAt()
        );
    }
}
