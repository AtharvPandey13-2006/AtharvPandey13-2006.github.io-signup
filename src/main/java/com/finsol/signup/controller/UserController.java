package com.finsol.signup.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.finsol.signup.model.User;
import com.finsol.signup.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    // SIGNUP
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        // Check if email already exists
        if (userRepo.findByEmail(user.getEmail()) != null) {
            return "Error: Email already registered.";
        }

        // Save user
        userRepo.save(user);
        return "Signup successful";
    }

    // LOGIN
    @PostMapping("/login")
public ResponseEntity<String> login(@RequestBody User loginRequest) {
    User user = userRepo.findByEmail(loginRequest.getEmail());

    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
    }

    if (!user.getPassword().equals(loginRequest.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
    }

    return ResponseEntity.ok("Login successful");
}

}
