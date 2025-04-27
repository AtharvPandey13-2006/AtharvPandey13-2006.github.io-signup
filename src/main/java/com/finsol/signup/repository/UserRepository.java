package com.finsol.signup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.finsol.signup.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
