package com.example.finalproject.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class TestController {
    @PostMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}
