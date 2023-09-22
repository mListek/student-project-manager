package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dto.UserDto;
import com.listek.studentprojectmanager.entity.User;
import com.listek.studentprojectmanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {

        User existingUser = userService.findUserByEmail(userDto.getEmail());

        if (existingUser != null && existingUser.getEmail() != null && !existingUser.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Account with this email already exists");
        }

        userService.saveUser(userDto);

        return ResponseEntity.ok().body(userDto);
    }
}
