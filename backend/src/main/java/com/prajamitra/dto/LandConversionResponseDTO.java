package com.prajamitra.dto;

import java.util.Map;

public class LandConversionResponseDTO {

    private double inputValue;
    private String fromUnit;
    private double standardSqYards;
    private double standardSqMeters;
    private Map<String, Double> convertedValues;

    public LandConversionResponseDTO() {}

    public LandConversionResponseDTO(double inputValue, String fromUnit, double standardSqYards, double standardSqMeters, Map<String, Double> convertedValues) {
        this.inputValue = inputValue;
        this.fromUnit = fromUnit;
        this.standardSqYards = standardSqYards;
        this.standardSqMeters = standardSqMeters;
        this.convertedValues = convertedValues;
    }

    public double getInputValue() { return inputValue; }
    public void setInputValue(double inputValue) { this.inputValue = inputValue; }

    public String getFromUnit() { return fromUnit; }
    public void setFromUnit(String fromUnit) { this.fromUnit = fromUnit; }

    public double getStandardSqYards() { return standardSqYards; }
    public void setStandardSqYards(double standardSqYards) { this.standardSqYards = standardSqYards; }

    public double getStandardSqMeters() { return standardSqMeters; }
    public void setStandardSqMeters(double standardSqMeters) { this.standardSqMeters = standardSqMeters; }

    public Map<String, Double> getConvertedValues() { return convertedValues; }
    public void setConvertedValues(Map<String, Double> convertedValues) { this.convertedValues = convertedValues; }
}
