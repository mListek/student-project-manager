package com.listek.studentprojectmanager.dao;

import com.listek.studentprojectmanager.entity.Message;
import com.listek.studentprojectmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTeamId(Long teamId);
}
