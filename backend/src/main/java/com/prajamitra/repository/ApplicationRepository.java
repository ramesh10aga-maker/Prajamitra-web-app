package com.prajamitra.repository;

import com.prajamitra.entity.ApplicationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {

    Optional<ApplicationEntity> findByApplicationNumber(String applicationNumber);

    List<ApplicationEntity> findByUserIdOrderBySubmittedAtDesc(Long userId);

    Page<ApplicationEntity> findByUserIdOrderBySubmittedAtDesc(Long userId, Pageable pageable);

    @Query("SELECT a FROM ApplicationEntity a WHERE a.user.email = :email ORDER BY a.submittedAt DESC")
    List<ApplicationEntity> findByUserEmail(@Param("email") String email);

    boolean existsByApplicationNumber(String applicationNumber);
}
