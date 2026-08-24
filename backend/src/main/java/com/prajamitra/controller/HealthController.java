package com.prajamitra.controller;

import com.prajamitra.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    private final JdbcTemplate jdbcTemplate;

    public HealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> health = new LinkedHashMap<>();
        health.put("status", "UP");
        health.put("app", "PrajaMitra Backend REST API");
        health.put("version", "1.0.0");
        health.put("timestamp", OffsetDateTime.now());

        boolean dbUp = false;
        try {
            Integer testVal = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            dbUp = (testVal != null && testVal == 1);
        } catch (Exception ignored) {
            dbUp = false;
        }
        health.put("database", dbUp ? "CONNECTED" : "DISCONNECTED");

        return ResponseEntity.ok(ApiResponse.ok(health));
    }
}
