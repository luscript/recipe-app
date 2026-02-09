package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        if (email == null || password == null) return ResponseEntity.badRequest().build();
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        String token = UUID.randomUUID().toString();
        String hash = passwordEncoder.encode(password);
        User u = new User(email, hash, token);
        userRepository.save(u);
        Map<String, String> res = new HashMap<>();
        res.put("token", token);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(res, headers, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        if (email == null || password == null) return ResponseEntity.badRequest().build();
        Optional<User> u = userRepository.findByEmail(email);
        if (u.isPresent()) {
            User user = u.get();
            String stored = user.getPassword();
            boolean matches = false;
            if (stored != null && (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$"))) {
                matches = passwordEncoder.matches(password, stored);
            } else {
                // legacy plain-text password; compare directly and upgrade to BCrypt when it matches
                matches = stored != null && stored.equals(password);
                if (matches) {
                    String rehash = passwordEncoder.encode(password);
                    user.setPassword(rehash);
                    userRepository.save(user);
                }
            }

            if (matches) {
                String token = UUID.randomUUID().toString();
                user.setToken(token);
                userRepository.save(user);
                Map<String, String> res = new HashMap<>();
                res.put("token", token);
                return ResponseEntity.ok(res);
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        String token = auth.substring(7);
        Optional<User> u = userRepository.findByToken(token);
        if (u.isPresent()) {
            Map<String, String> res = new HashMap<>();
            res.put("email", u.get().getEmail());
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
