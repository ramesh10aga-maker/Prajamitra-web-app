package com.prajamitra.repository;

import com.prajamitra.entity.ServiceEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {

    Optional<ServiceEntity> findByServiceCode(String serviceCode);

    Page<ServiceEntity> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT s FROM ServiceEntity s WHERE LOWER(s.category.name) = LOWER(:categoryName)")
    Page<ServiceEntity> findByCategoryName(@Param("categoryName") String categoryName, Pageable pageable);

    @Query("SELECT s FROM ServiceEntity s WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.nameTe) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.descriptionTe) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.serviceCode) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.category.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<ServiceEntity> searchServices(@Param("query") String query, Pageable pageable);

    @Query("SELECT s FROM ServiceEntity s WHERE " +
           "(LOWER(s.category.name) = LOWER(:category) OR :category IS NULL) AND " +
           "(LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(s.nameTe) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " :query IS NULL)")
    Page<ServiceEntity> findByCategoryAndQuery(@Param("category") String category, @Param("query") String query, Pageable pageable);

    List<ServiceEntity> findTop12ByVerifiedTrueOrderByCreatedAtDesc();
}
