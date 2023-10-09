package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.entity.Team;
import com.listek.studentprojectmanager.entity.User;
import com.listek.studentprojectmanager.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamService teamService;

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        User existingUser = userRepository.findById(user.getId());

        if (!Objects.equals(existingUser.getPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return ResponseEntity.ok().body(userRepository.save(user));
    }

    @GetMapping("/users/{userId}/teams")
    public ResponseEntity<Set<Team>> getUserTeams(@PathVariable(name = "userId") long userId) {
        User user = userRepository.findById(userId);

        return new ResponseEntity<>(user.getTeams(), HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/teams")
    public ResponseEntity<?> addUserToTeam(@PathVariable(name = "userId") long userId,
                                           @RequestBody String teamCode) {
        System.out.println(teamCode);
        Team team = teamService.findTeamByCode(teamCode);
        if (team == null) {
            return ResponseEntity.badRequest().body("WRONG_CODE");
        }
        User user = userRepository.findById(userId);
        user.addTeam(team);

        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable(name = "userId") long userId) {

        User user = userRepository.findById(userId);
        user.setEmail(user.getEmail() + "deleted");
        user.setPassword("user_deleted");
        user.setLastName(user.getLastName() + " (konto usunięte)");

        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
