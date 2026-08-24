package com.prajamitra.repository;

import com.prajamitra.entity.ApplicationStatusHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationStatusHistoryRepository extends JpaRepository<ApplicationStatusHistoryEntity, Long> {
    List<ApplicationStatusHistoryEntity> findByApplicationIdOrderByChangedAtAsc(Long applicationId);
}
