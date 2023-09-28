package com.listek.studentprojectmanager.dao;

import com.listek.studentprojectmanager.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findByCode(String code);
    Team findById(long teamId);
}
