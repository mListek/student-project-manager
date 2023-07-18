package com.listek.studentprojectmanager.dao;

import com.listek.studentprojectmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
