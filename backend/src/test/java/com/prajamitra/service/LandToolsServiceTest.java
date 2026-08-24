package com.prajamitra.service;

import com.prajamitra.dto.LandConversionRequestDTO;
import com.prajamitra.dto.LandConversionResponseDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LandToolsServiceTest {

    private final LandToolsService service = new LandToolsService();

    @Test
    void testConvertAcresToCents() {
        LandConversionRequestDTO req = new LandConversionRequestDTO(2.0, "acres");
        LandConversionResponseDTO res = service.convertLandUnits(req);

        assertNotNull(res);
        assertEquals(2.0, res.getInputValue());
        assertEquals("acres", res.getFromUnit());
        assertEquals(200.0, res.getConvertedValues().get("cents"));
        assertEquals(80.0, res.getConvertedValues().get("guntas"));
    }

    @Test
    void testConvertCentsToSqYards() {
        LandConversionRequestDTO req = new LandConversionRequestDTO(10.0, "cents");
        LandConversionResponseDTO res = service.convertLandUnits(req);

        assertNotNull(res);
        assertEquals(484.0, res.getConvertedValues().get("sq_yards"));
    }
}
