package com.movie.Moviebackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FileMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String email;
    private String secretKey; // The original secret key
    private String encryptedKeyStore; // Encrypted key
    private String reencryptedData; // New field for re-encrypted data

    // Default constructor
    public FileMetadata() {
    }

    // Constructor with parameters
    public FileMetadata(String fileName, String email, String secretKey, String encryptedKeyStore, String reencryptedData) {
        this.fileName = fileName;
        this.email = email;
        this.secretKey = secretKey;
        this.encryptedKeyStore = encryptedKeyStore;
        this.reencryptedData = reencryptedData;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getEncryptedKeyStore() {
        return encryptedKeyStore;
    }

    public void setEncryptedKeyStore(String encryptedKeyStore) {
        this.encryptedKeyStore = encryptedKeyStore;
    }

    public String getReencryptedData() {
        return reencryptedData;
    }

    public void setReencryptedData(String reencryptedData) {
        this.reencryptedData = reencryptedData;
    }
}
