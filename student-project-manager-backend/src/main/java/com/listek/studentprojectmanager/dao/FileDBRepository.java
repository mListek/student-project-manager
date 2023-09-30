package com.listek.studentprojectmanager.dao;

import com.listek.studentprojectmanager.entity.FileDB;
import com.listek.studentprojectmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.File;
import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface FileDBRepository extends JpaRepository<FileDB, String> {
    List<FileDB> findByTeamId(Long teamId);
}
