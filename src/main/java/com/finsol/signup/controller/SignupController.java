package com.finsol.signup.controller;

import com.finsol.signup.model.User;
import com.finsol.signup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
public class SignupController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public String signup(@RequestBody User user) {
        System.out.println("✅ Received signup request: " + user.getName());

        userRepository.save(user);

        System.out.println("✅ User saved successfully: " + user.getName());
        return "Signup successful!";
    }
}
