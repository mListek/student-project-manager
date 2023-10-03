package com.listek.studentprojectmanager.controller;

import com.listek.studentprojectmanager.dao.FileDBRepository;
import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dto.ResponseFile;
import com.listek.studentprojectmanager.dto.ResponseMessage;
import com.listek.studentprojectmanager.entity.FileDB;
import com.listek.studentprojectmanager.entity.Team;
import com.listek.studentprojectmanager.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class FIleController {

    @Autowired
    private FileStorageService storageService;

    @Autowired
    private FileDBRepository fileRepository;

    @Autowired
    private TeamRepository teamRepository;

    @PostMapping("/teams/{teamId}/files")
    public ResponseEntity<ResponseMessage> uploadFile(@PathVariable(name = "teamId") long teamId,
                                                      @RequestParam("file")MultipartFile file) {
        String message = "";
        System.out.println(teamId);
        try {
            Team team = teamRepository.findById(teamId);
            storageService.store(file, team);
            message = "Uploaded file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            System.out.println("error");
            System.out.println(e.getCause());
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping("teams/{teamId}/files")
    public ResponseEntity<List<ResponseFile>> getListFiles(@PathVariable(name = "teamId") long teamId) {
        List<ResponseFile> files = storageService.getAllTeamFiles(teamId).map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/files/")
                    .path(dbFile.getId())
                    .toUriString();

            return new ResponseFile(
                    dbFile.getId(),
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
    }

    @DeleteMapping("/files/{id}")
    public ResponseEntity<HttpStatus> deleteFile(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);

        fileRepository.delete(fileDB);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
