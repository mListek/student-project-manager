package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.TaskRepository;
import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.dto.TaskRequest;
import com.listek.studentprojectmanager.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/teams/{teamId}/tasks")
    public ResponseEntity<Task> createTask(@PathVariable(value = "teamId") long teamId,
                           @RequestBody TaskRequest taskRequest) {
        Task task = new Task();
        task.setDescription(taskRequest.getDescription());
        task.setStatus(taskRequest.getStatus());
        task.setTeam(teamRepository.findById(teamId));

        task.addUser(userRepository.findById(taskRequest.getUserId()));

        return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
    }
}
