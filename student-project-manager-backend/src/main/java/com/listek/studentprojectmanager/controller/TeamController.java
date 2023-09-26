package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dao.UserRepository;
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

//    @GetMapping("/users/{userId}/teams")
//    public ResponseEntity<Set<Team>> getAllTeamsByUserId(@PathVariable(value = "userId") Long userId) {
//        if (!userRepository.existsById(userId)) {
//            throw new ResourceNotFoundException("Not found User with id = " + userId);
//        }
//
//        Set<Team> teams = teamRepository.findTeamsByUsersId(userId);
//        return new ResponseEntity<>(teams, HttpStatus.OK);
//    }
//
//    @GetMapping("/teams/{teamId}/users")
//    public ResponseEntity<List<User>> getAllUsersByTeamId(@PathVariable(value = "teamId") Long teamId) {
//        if (!teamRepository.existsById(teamId)) {
//            throw new ResourceNotFoundException("Not found Team with id = " + teamId);
//        }
//
//        List<User> users = userRepository.findUsersByTeamsId(teamId);
//
//        return new ResponseEntity<>(users, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/users/{userId}/teams/{teamId}")
//    public ResponseEntity<HttpStatus> deleteTeamFromUser(
//            @PathVariable(value = "userId") Long userId,
//            @PathVariable(value = "teamId") Long teamId) {
//        System.out.println("userid" + userId+ "teamid" + teamId);
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id: " + userId));
//
//        System.out.println(user.toString());
//        user.setTeams(teamRepository.findTeamsByUsersId(userId));
//        user.removeTeam(teamId);
//        System.out.println(user.toString());
//        userRepository.save(user);
//
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
