package com.finsol.signup.controller;

import com.finsol.signup.model.User;
import com.finsol.signup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*") // allow frontend
public class SignupController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userRepository.save(user);
    }
}
