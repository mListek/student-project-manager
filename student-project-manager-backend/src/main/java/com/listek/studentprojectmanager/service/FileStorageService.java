package com.listek.studentprojectmanager.service;

import com.listek.studentprojectmanager.dao.FileDBRepository;
import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.entity.FileDB;
import com.listek.studentprojectmanager.entity.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

@Service
public class FileStorageService {

    @Autowired
    private FileDBRepository fileDBRepository;

    @Autowired
    private TeamRepository teamRepository;

    public FileDB store(MultipartFile file, Team team) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileDB fileDB = new FileDB(fileName, file.getContentType(), team, file.getBytes());

        return fileDBRepository.save(fileDB);
    }

    public FileDB getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    public Stream<FileDB> getAllTeamFiles(long teamId) {
        return fileDBRepository.findByTeamId(teamId).stream();
    }
}
