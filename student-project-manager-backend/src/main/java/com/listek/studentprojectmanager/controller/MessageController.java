package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.MessageRepository;
import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.dto.MessageDto;
import com.listek.studentprojectmanager.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class MessageController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/teams/{teamId}/messages")
    public ResponseEntity<List<Message>> getMessagesByTeamId(@PathVariable(value = "teamId")Long teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new ResourceNotFoundException(("Not found Team with id = " + teamId));
        }

        List<Message> messages = messageRepository.findByTeamId(teamId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PostMapping("/messages")
    public ResponseEntity<?> createMessage(@RequestBody MessageDto messageDto) {
        Message message = new Message();
        message.setLabel(messageDto.getLabel());
        message.setTeam(teamRepository.findById(messageDto.getTeamId()));
        message.setUser(userRepository.findById(messageDto.getUserId()));

        return new ResponseEntity<>(messageRepository.save(message), HttpStatus.OK);
    }
}
