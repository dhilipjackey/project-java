package com.movie.Moviebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.movie.Moviebackend.Repository.FileRequestRepository;
import com.movie.Moviebackend.model.FileRequest;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class FileRequestController {

    @Autowired
    private FileRequestRepository repository;

    @PostMapping
    public ResponseEntity<FileRequest> createRequest(@RequestBody FileRequest fileRequest) {
        fileRequest.setStatus("Pending"); // Set initial status
        FileRequest savedRequest = repository.save(fileRequest);
        return ResponseEntity.ok(savedRequest);
    }

    // New method to get all file requests
    @GetMapping
    public ResponseEntity<List<FileRequest>> getAllRequests() {
        List<FileRequest> requests = repository.findAll();
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FileRequest> updateRequestStatus(@PathVariable Long id, @RequestBody StatusUpdate statusUpdate) {
        return repository.findById(id)
                .map(request -> {
                    request.setStatus(statusUpdate.getStatus()); // Update the status
                    FileRequest updatedRequest = repository.save(request);
                    return ResponseEntity.ok(updatedRequest);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // New method to get file requests by email
    @GetMapping("/byEmail")
    public ResponseEntity<List<FileRequest>> getRequestsByEmail(@RequestParam String email) {
        List<FileRequest> requests = repository.findByEmail(email);
        return ResponseEntity.ok(requests);
    }
}
