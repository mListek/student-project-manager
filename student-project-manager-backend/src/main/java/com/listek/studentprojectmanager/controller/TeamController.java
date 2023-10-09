package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.TaskRepository;
import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.dto.TeamRequest;
import com.listek.studentprojectmanager.entity.Task;
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

    @Autowired
    private TaskRepository taskRepository;

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

    @DeleteMapping("/teams/{teamId}")
    public ResponseEntity<HttpStatus> deleteTeam(@PathVariable(name = "teamId") long teamId) {
        Team team = teamRepository.findById(teamId);
        List<Task> tasks = taskRepository.findByTeamId(team.getId());
        for (User user : team.getUsers()) {
            user.removeTeam(teamId);
            userRepository.save(user);
            for (Task task : tasks) {
                if (task.getUsers().stream().anyMatch(u -> u.getEmail().equals(user.getEmail()))) {
                    task.removeUser(user.getId());
                    taskRepository.save(task);
                }
            }
        }
        teamRepository.delete(team);


        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/users/{userId}/teams/{teamId}")
    public ResponseEntity<?> deleteTeamFromUser(
            @PathVariable(value = "userId") Long userId,
            @PathVariable(value = "teamId") Long teamId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id: " + userId));

        user.removeTeam(teamId);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
