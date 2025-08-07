package com.movie.Moviebackend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.movie.Moviebackend.Repository.DataUserRepository;
import com.movie.Moviebackend.model.DataUser;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/datauser")
public class DataUserController {

    @Autowired
    private DataUserRepository dataUserRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerDataUser(@RequestBody DataUser dataUser) {
        // Check if username already exists
        DataUser existingUserByUsername = dataUserRepository.findByUsername(dataUser.getUsername());
        if (existingUserByUsername != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Check if email already exists
        DataUser existingUserByEmail = dataUserRepository.findByEmail(dataUser.getEmail());
        if (existingUserByEmail != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        dataUserRepository.save(dataUser);
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginDataUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        DataUser dataUser = dataUserRepository.findByEmail(email);

        if (dataUser == null || !dataUser.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        return ResponseEntity.ok("Login successful");
    }
    
    
    @GetMapping("/all")
    public ResponseEntity<List<DataUser>> getAllDataUsers() {
        List<DataUser> allUsers = dataUserRepository.findAll();
        return ResponseEntity.ok(allUsers);
    }

    // Additional methods (e.g., update, delete) can be added here
}