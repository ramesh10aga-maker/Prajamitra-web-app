package com.prajamitra.service;

import com.prajamitra.dto.AuthRequestDTO;
import com.prajamitra.dto.AuthResponseDTO;
import com.prajamitra.dto.RegisterRequestDTO;
import com.prajamitra.dto.UserDTO;
import com.prajamitra.entity.UserEntity;
import com.prajamitra.exception.BadRequestException;
import com.prajamitra.exception.ResourceNotFoundException;
import com.prajamitra.exception.UnauthorizedException;
import com.prajamitra.repository.UserRepository;
import com.prajamitra.security.JwtService;
import com.prajamitra.security.UserPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(cleanEmail)) {
            throw new BadRequestException("Email is already registered: " + cleanEmail);
        }

        UserEntity user = new UserEntity();
        user.setName(request.getName().trim());
        user.setEmail(cleanEmail);
        user.setPhone(request.getPhone() != null ? request.getPhone().trim() : null);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_CITIZEN");
        user.setDistrict(request.getDistrict());
        user.setMandal(request.getMandal());
        user.setVillage(request.getVillage());

        UserEntity savedUser = userRepository.save(user);
        UserPrincipal principal = UserPrincipal.create(savedUser);
        String token = jwtService.generateToken(principal);

        return new AuthResponseDTO(token, jwtService.getExpirationMs(), mapToUserDTO(savedUser));
    }

    @Transactional(readOnly = true)
    public AuthResponseDTO login(AuthRequestDTO request) {
        String identifier = request.getEmail().trim().toLowerCase();

        UserEntity user = userRepository.findByEmail(identifier)
                .or(() -> userRepository.findByPhone(identifier))
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        UserPrincipal principal = UserPrincipal.create(user);
        String token = jwtService.generateToken(principal);

        return new AuthResponseDTO(token, jwtService.getExpirationMs(), mapToUserDTO(user));
    }

    @Transactional(readOnly = true)
    public UserDTO getCurrentUser(UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new UnauthorizedException("User is not authenticated");
        }
        UserEntity user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));

        return mapToUserDTO(user);
    }

    public UserDTO mapToUserDTO(UserEntity user) {
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
