package com.example.backend.controllers; // Ajusta tu paquete

import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user") 
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String, String> body,
            Authentication authentication) {

        String newPassword = body.get("newPassword");
        String currentPassword = body.get("currentPassword");
        String emailFromBody = body.get("email");

        if (newPassword == null) {
            return ResponseEntity.badRequest().body("Faltan datos: newPassword");
        }

        try {
            if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
                // Authenticated user: change password without requiring currentPassword
                String email = authentication.getName();
                userService.changePassword(email, newPassword);
                return ResponseEntity.ok(Map.of("message", "Contraseña actualizada correctamente"));
            } else {
                // Unauthenticated: require email + currentPassword
                if (emailFromBody == null || currentPassword == null) {
                    return ResponseEntity.badRequest().body("Faltan datos: email o currentPassword");
                }
                userService.changePasswordWithCurrent(emailFromBody, currentPassword, newPassword);
                return ResponseEntity.ok(Map.of("message", "Contraseña actualizada correctamente"));
            }

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}