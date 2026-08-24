package com.prajamitra.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.Map;

public class LandConversionRequestDTO {

    @NotNull(message = "Value is required")
    @Positive(message = "Value must be positive")
    private Double value;

    @NotNull(message = "Source unit is required")
    private String fromUnit;

    public LandConversionRequestDTO() {}

    public LandConversionRequestDTO(Double value, String fromUnit) {
        this.value = value;
        this.fromUnit = fromUnit;
    }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }

    public String getFromUnit() { return fromUnit; }
    public void setFromUnit(String fromUnit) { this.fromUnit = fromUnit; }
}
