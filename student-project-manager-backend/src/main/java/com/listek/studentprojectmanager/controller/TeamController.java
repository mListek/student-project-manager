package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.dto.TeamRequest;
import com.listek.studentprojectmanager.entity.Team;
import com.listek.studentprojectmanager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TeamController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @PostMapping("/teams")
    public ResponseEntity<?> createTeam(@RequestBody TeamRequest teamRequest) {
        System.out.println(teamRequest.getName() + teamRequest.getUserId());
        Team team = new Team(teamRequest.getName());

        Team newTeam = teamRepository.save(team);
        User user = userRepository.findById(teamRequest.getUserId());
        user.addTeam(newTeam);
        teamRepository.save(newTeam);

        return new ResponseEntity<>(newTeam, HttpStatus.OK);
    }

    @DeleteMapping("/users/{userId}/teams/{teamId}")
    public ResponseEntity<?> deleteTeamFromUser(
            @PathVariable(value = "userId") Long userId,
            @PathVariable(value = "teamId") Long teamId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id: " + userId));

        if (user.getTeams().size() > 1) {
            user.removeTeam(teamId);
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.badRequest().body("LAST_GROUP");
    }
}
