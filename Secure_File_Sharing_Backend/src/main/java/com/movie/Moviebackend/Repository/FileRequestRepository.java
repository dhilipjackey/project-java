package com.movie.Moviebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movie.Moviebackend.model.FileRequest;

import java.util.List;

@Repository
public interface FileRequestRepository extends JpaRepository<FileRequest, Long> {
    List<FileRequest> findByEmail(String email); // New method to find requests by email
}
