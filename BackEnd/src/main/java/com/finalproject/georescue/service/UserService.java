package com.finalproject.georescue.service;

import com.finalproject.georescue.model.User;
import com.finalproject.georescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Use PasswordEncoder instead of BCryptPasswordEncoder
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Change type to PasswordEncoder

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; // Spring will inject the BCryptPasswordEncoder here
    }

    public User registerUser(User user) {
        // Check if the email is already registered
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }

        // Hash the password before saving the user
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Use the injected PasswordEncoder

        // Save the new user with hashed password
        return userRepository.save(user);
    }
}
