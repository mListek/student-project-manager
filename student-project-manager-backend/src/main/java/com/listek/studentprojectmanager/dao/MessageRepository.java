package com.listek.studentprojectmanager.dao;

import com.listek.studentprojectmanager.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface MessageRepository extends JpaRepository<Message, Long> {
}
