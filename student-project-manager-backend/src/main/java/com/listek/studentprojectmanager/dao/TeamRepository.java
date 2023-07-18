package com.listek.studentprojectmanager.dao;

import com.listek.studentprojectmanager.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
