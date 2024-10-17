package com.finalproject.georescue.service;

import com.finalproject.georescue.model.User;
import com.finalproject.georescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; // Spring will inject the BCryptPasswordEncoder here
    }

    // Register a new user
    public User registerUser(User user) {
        // Check if the email is already registered
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }

        // Hash the password before saving the user
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the new user with hashed password
        return userRepository.save(user);
    }

    // Login user with email and password
    public String loginUser(String email, String password) {
        // Find user by email
        User user = userRepository.findByEmail(email);

        // Check if user exists
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }

        // Verify the password using the PasswordEncoder
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // If login is successful, return a success message or token
        return "Login successful!"; // Replace this with JWT token generation if needed
    }
}
