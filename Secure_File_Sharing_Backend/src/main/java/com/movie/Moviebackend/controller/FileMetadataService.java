package com.movie.Moviebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movie.Moviebackend.Repository.FileMetadataRepository;
import com.movie.Moviebackend.model.FileMetadata;

import java.util.List;
import java.util.Optional;

@Service
public class FileMetadataService {

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    public void saveFileMetadata(String fileName, String email, String secretKey) {
        FileMetadata fileMetadata = new FileMetadata();
        fileMetadata.setFileName(fileName);
        fileMetadata.setEmail(email);
        fileMetadata.setSecretKey(secretKey);
        fileMetadataRepository.save(fileMetadata);
    }

    public List<FileMetadata> getFilesByEmail(String email) {
        return fileMetadataRepository.findByEmail(email);
    }

    public void deleteFile(Long id) {
        fileMetadataRepository.deleteById(id);
    }
}
