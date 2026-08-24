package com.prajamitra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PrajamitraApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrajamitraApplication.class, args);
    }
}
