package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        User existingUser = userRepository.findById(user.getId());

        if (!Objects.equals(existingUser.getPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return ResponseEntity.ok().body(userRepository.save(user));
    }
}
