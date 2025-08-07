package com.movie.Moviebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.movie.Moviebackend.Repository.FileMetadataRepository;
import com.movie.Moviebackend.model.FileMetadata;

import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private FileMetadataService fileMetadataService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email,
            @RequestParam("secretKey") String secretKey) { // New field for incoming secret key

        try {
            // Handle file upload
            s3Service.uploadFile(file, email, secretKey);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to upload file: " + e.getMessage());
        }
    }

    @GetMapping("/filesByEmail")
    public ResponseEntity<?> getFilesByEmail(@RequestParam String email) {
        try {
            return ResponseEntity.ok(fileMetadataService.getFilesByEmail(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error fetching files: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<String> deleteFile(@PathVariable Long fileId) {
        try {
            fileMetadataService.deleteFile(fileId);
            return ResponseEntity.ok("File deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to delete file: " + e.getMessage());
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable String fileName) {
        try {
            // Retrieve the file from S3
            InputStream fileInputStream = s3Service.downloadFile(fileName);
            if (fileInputStream == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body(null);
            }
            InputStreamResource resource = new InputStreamResource(fileInputStream);

            // Set up the response
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null);
        }
    }
    
    
    
    @Autowired
    private FileMetadataRepository fileMetadataRepository; // Injecting the repository directly

    
    @GetMapping("/all")
    public ResponseEntity<List<FileMetadata>> getAllFiles() {
        try {
            List<FileMetadata> allFiles = fileMetadataRepository.findAll();
            if (allFiles.isEmpty()) {
                return ResponseEntity.noContent().build(); // Return 204 No Content if empty
            }
            return ResponseEntity.ok(allFiles); // Return 200 OK with the list
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null); // Return 500 Internal Server Error
        }
    }
}
