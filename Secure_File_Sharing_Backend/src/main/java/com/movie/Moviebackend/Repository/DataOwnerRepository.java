package com.movie.Moviebackend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movie.Moviebackend.model.DataOwner;

@Repository
public interface DataOwnerRepository extends JpaRepository<DataOwner, Long> {
    DataOwner findByUsername(String username);
    DataOwner findByEmail(String email); // New method to find by email
}
