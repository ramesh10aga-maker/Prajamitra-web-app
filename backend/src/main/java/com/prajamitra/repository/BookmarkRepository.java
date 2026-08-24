package com.prajamitra.repository;

import com.prajamitra.entity.BookmarkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<BookmarkEntity, Long> {

    List<BookmarkEntity> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT b FROM BookmarkEntity b WHERE b.user.email = :email ORDER BY b.createdAt DESC")
    List<BookmarkEntity> findByUserEmail(@Param("email") String email);

    Optional<BookmarkEntity> findByUserIdAndServiceId(Long userId, Long serviceId);

    boolean existsByUserIdAndServiceId(Long userId, Long serviceId);

    void deleteByUserIdAndServiceId(Long userId, Long serviceId);
}
