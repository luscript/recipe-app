package com.example.backend.services;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void changePassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));



        String newHash = passwordEncoder.encode(newPassword);

        user.setPassword(newHash);
        user.setToken(UUID.randomUUID().toString());

        userRepository.save(user);
    }

    public void changePasswordWithCurrent(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String stored = user.getPassword();
        boolean matches = false;
        if (stored != null && (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$"))) {
            matches = passwordEncoder.matches(currentPassword, stored);
        } else {
            // legacy plain-text password
            matches = stored != null && stored.equals(currentPassword);
            if (matches) {
                // upgrade stored password to BCrypt
                String rehash = passwordEncoder.encode(currentPassword);
                user.setPassword(rehash);
            }
        }

        if (!matches) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }

        String newHash = passwordEncoder.encode(newPassword);
        user.setPassword(newHash);
        user.setToken(UUID.randomUUID().toString());

        userRepository.save(user);
    }
}