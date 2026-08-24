package com.prajamitra.dto;

public class AuthResponseDTO {

    private String token;
    private String tokenType = "Bearer";
    private long expiresIn;
    private UserDTO user;

    public AuthResponseDTO() {}

    public AuthResponseDTO(String token, long expiresIn, UserDTO user) {
        this.token = token;
        this.tokenType = "Bearer";
        this.expiresIn = expiresIn;
        this.user = user;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(long expiresIn) { this.expiresIn = expiresIn; }

    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
}
