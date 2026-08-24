package com.prajamitra.repository;

import com.prajamitra.entity.ServiceCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServiceCategoryRepository extends JpaRepository<ServiceCategoryEntity, Long> {
    Optional<ServiceCategoryEntity> findByNameIgnoreCase(String name);
}
