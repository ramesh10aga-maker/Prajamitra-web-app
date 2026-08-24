package com.prajamitra.service;

import com.prajamitra.dto.LandConversionRequestDTO;
import com.prajamitra.dto.LandConversionResponseDTO;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class LandToolsService {

    // Base unit: Square Yards (Gajam)
    private static final Map<String, Double> UNIT_TO_SQ_YARDS = Map.of(
            "acres", 4840.0,
            "cents", 48.4,
            "guntas", 121.0,
            "sq_yards", 1.0,
            "sq_meters", 1.19599,
            "sq_feet", 1.0 / 9.0,
            "hectares", 11959.9
    );

    public LandConversionResponseDTO convertLandUnits(LandConversionRequestDTO request) {
        double val = request.getValue();
        String unitKey = request.getFromUnit().toLowerCase().trim();

        double multiplier = UNIT_TO_SQ_YARDS.getOrDefault(unitKey, 1.0);
        double totalSqYards = val * multiplier;
        double totalSqMeters = totalSqYards * 0.836127;

        Map<String, Double> converted = new LinkedHashMap<>();
        converted.put("acres", round6(totalSqYards / 4840.0));
        converted.put("cents", round6(totalSqYards / 48.4));
        converted.put("guntas", round6(totalSqYards / 121.0));
        converted.put("sq_yards", round6(totalSqYards));
        converted.put("sq_meters", round6(totalSqMeters));
        converted.put("sq_feet", round6(totalSqYards * 9.0));
        converted.put("hectares", round6(totalSqYards / 11959.9));

        return new LandConversionResponseDTO(val, unitKey, round6(totalSqYards), round6(totalSqMeters), converted);
    }

    private double round6(double val) {
        return Math.round(val * 1000000.0) / 1000000.0;
    }
}
