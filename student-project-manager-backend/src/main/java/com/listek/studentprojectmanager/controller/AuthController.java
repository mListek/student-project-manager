package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dto.LoginDto;
import com.listek.studentprojectmanager.dto.UserDto;
import com.listek.studentprojectmanager.entity.User;
import com.listek.studentprojectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {

        User existingUser = userService.findUserByEmail(userDto.getEmail());

        if (existingUser != null && existingUser.getEmail() != null && !existingUser.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("ALREADY_EXISTS");
        }

        userService.saveUser(userDto);

        User createdUser = userService.findUserByEmail(userDto.getEmail());

        return ResponseEntity.ok().body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        User existingUser = userService.findUserByEmail(loginDto.getEmail());

        if (existingUser == null) {
            return ResponseEntity.badRequest().body("BAD_CREDENTIALS");
        }

        if (!passwordEncoder.matches(loginDto.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.badRequest().body("WRONG_PASSWORD");
        }

//        existingUser.setTeams(teamRepository.findTeamsByUsersId(existingUser.getId()));

        return ResponseEntity.ok().body(existingUser);
    }
}
