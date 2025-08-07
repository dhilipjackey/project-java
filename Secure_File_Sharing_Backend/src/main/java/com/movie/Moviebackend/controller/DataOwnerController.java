package com.movie.Moviebackend.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.movie.Moviebackend.Repository.DataOwnerRepository;
import com.movie.Moviebackend.model.DataOwner;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/dataowner")
public class DataOwnerController {

    @Autowired
    private DataOwnerRepository dataOwnerRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerDataOwner(@RequestBody DataOwner dataOwner) {
        // Check if username already exists
        DataOwner existingUserByUsername = dataOwnerRepository.findByUsername(dataOwner.getUsername());
        if (existingUserByUsername != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Check if email already exists
        DataOwner existingUserByEmail = dataOwnerRepository.findByEmail(dataOwner.getEmail());
        if (existingUserByEmail != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        dataOwnerRepository.save(dataOwner);
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginDataOwner(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        DataOwner dataOwner = dataOwnerRepository.findByEmail(email);

        if (dataOwner == null || !dataOwner.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        return ResponseEntity.ok("Login successful");
    }

    
    @GetMapping("/all")
    public ResponseEntity<List<DataOwner>> getAllDataOwners() {
        List<DataOwner> allOwners = dataOwnerRepository.findAll();
        return ResponseEntity.ok(allOwners);
    }

    // Additional methods (e.g., update, delete) can be added here
}
