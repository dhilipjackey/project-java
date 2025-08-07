package com.movie.Moviebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Moviebackend.model.DataUser;

@Repository
public interface DataUserRepository extends JpaRepository<DataUser, Long> {
    DataUser findByUsername(String username);
    DataUser findByEmail(String email);
}
