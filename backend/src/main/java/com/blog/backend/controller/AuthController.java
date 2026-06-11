package com.blog.backend.controller;

import com.blog.backend.model.User;
import com.blog.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        return authService.login(user);
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = authService.getProfile(token);
        return ResponseEntity.ok(Map.of("email", email));
    }
}