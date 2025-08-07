package com.movie.Moviebackend.Repository;

import com.movie.Moviebackend.model.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {
    List<FileMetadata> findByEmail(String email);
    void deleteByFileNameAndEmail(String fileName, String email);
    FileMetadata findByEmailAndFileName(String email, String fileName);
    FileMetadata findByFileName(String fileName);  // Added method
}
