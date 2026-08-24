package com.prajamitra.dto;

public class ServiceCategoryDTO {
    private Long id;
    private String name;
    private String nameTe;
    private String description;
    private long serviceCount;

    public ServiceCategoryDTO() {}

    public ServiceCategoryDTO(Long id, String name, String nameTe, String description, long serviceCount) {
        this.id = id;
        this.name = name;
        this.nameTe = nameTe;
        this.description = description;
        this.serviceCount = serviceCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameTe() { return nameTe; }
    public void setNameTe(String nameTe) { this.nameTe = nameTe; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public long getServiceCount() { return serviceCount; }
    public void setServiceCount(long serviceCount) { this.serviceCount = serviceCount; }
}
