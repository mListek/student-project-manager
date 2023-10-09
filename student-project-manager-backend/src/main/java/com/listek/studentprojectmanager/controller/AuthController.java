package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.dto.LoginDto;
import com.listek.studentprojectmanager.dto.UserDto;
import com.listek.studentprojectmanager.entity.Team;
import com.listek.studentprojectmanager.entity.User;
import com.listek.studentprojectmanager.service.TeamService;
import com.listek.studentprojectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {

        User existingUser = userService.findUserByEmail(userDto.getEmail());

        if (existingUser != null && existingUser.getEmail() != null && !existingUser.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("ALREADY_EXISTS");
        }

        if (Objects.equals(userDto.getRole(), "student")) {
            Team team = teamService.findTeamByCode(userDto.getCode());
            if (team == null)
                return ResponseEntity.badRequest().body("WRONG_CODE");
        }

        User createdUser = userService.saveUser(userDto);

        if (Objects.equals(userDto.getRole(), "teacher")) {
            teamService.createTeamAndAddUser(createdUser);
        } else {
            Team team = teamService.findTeamByCode(userDto.getCode());

            userService.addUserToTeam(createdUser, team);
        }

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

        return ResponseEntity.ok().body(existingUser);
    }
}
