package com.movie.Moviebackend.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.movie.Moviebackend.Repository.FileMetadataRepository;
import com.movie.Moviebackend.model.FileMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.Key;

@Service
public class S3Service {

    private static final Logger logger = LoggerFactory.getLogger(S3Service.class);

    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    private String bucketName = "databuckets12"; // Replace with your bucket name

    public void uploadFile(MultipartFile file, String email, String secretKey) throws IOException {
        try {
            // Encrypt with AES
            Key aesKeySpec = EncryptionUtils.createKey(secretKey, "AES");
            byte[] encryptedBytes = EncryptionUtils.encryptData(file.getBytes(), aesKeySpec);

            // Upload the encrypted file to S3
            try (InputStream encryptedStream = new ByteArrayInputStream(encryptedBytes)) {
                s3Client.putObject(bucketName, file.getOriginalFilename(), encryptedStream, null);
            }

            // Re-encrypt with DES
            Key desKeySpec = EncryptionUtils.generateDESKey();
            byte[] reencryptedBytes = EncryptionUtils.encryptDataWithDES(encryptedBytes, desKeySpec);
            String reencryptedData = EncryptionUtils.encodeKey(desKeySpec);

            // Save file metadata
            FileMetadata fileMetadata = new FileMetadata(file.getOriginalFilename(), email, secretKey, 
                                                         EncryptionUtils.encodeKey(aesKeySpec), reencryptedData);
            fileMetadataRepository.save(fileMetadata);

        } catch (Exception e) {
            logger.error("Error during encryption/upload: ", e);
            throw new IOException("Error during encryption/upload", e);
        }
    }

    public ByteArrayInputStream downloadFile(String filename) {
        try {
            // Download the file from S3
            S3ObjectInputStream s3InputStream = s3Client.getObject(bucketName, filename).getObjectContent();
            byte[] encryptedBytes = s3InputStream.readAllBytes();
            s3InputStream.close();

            // Retrieve the AES key for decryption
            FileMetadata fileMetadata = fileMetadataRepository.findByFileName(filename);
            if (fileMetadata == null) {
                throw new IllegalArgumentException("File metadata not found");
            }
            Key aesKeySpec = EncryptionUtils.createKey(fileMetadata.getSecretKey(), "AES");

            // Decrypt the file using AES
            byte[] decryptedBytes = EncryptionUtils.decryptData(encryptedBytes, aesKeySpec);

            return new ByteArrayInputStream(decryptedBytes);
        } catch (Exception e) {
            logger.error("Error during decryption/download: ", e);
            return null;
        }
    }
}
