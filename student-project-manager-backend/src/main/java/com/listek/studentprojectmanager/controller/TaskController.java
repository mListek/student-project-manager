package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.TaskRepository;
import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.dto.TaskDto;
import com.listek.studentprojectmanager.entity.Message;
import com.listek.studentprojectmanager.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/teams/{teamId}/tasks")
    public ResponseEntity<List<Task>> getTasksByTeamId(@PathVariable(value = "teamId")Long teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new ResourceNotFoundException(("Not found Team with id = " + teamId));
        }

        List<Task> tasks = taskRepository.findByTeamId(teamId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody TaskDto taskDto) {
        Task task = new Task();
        task.setDescription(taskDto.getDescription());
        task.setTeam(teamRepository.findById(taskDto.getTeamId()));

        task.addUser(userRepository.findById(taskDto.getUserId()));

        return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
    }

    @PutMapping ResponseEntity<Task> updateTask(@RequestBody Task task) {
        return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
    }
}
