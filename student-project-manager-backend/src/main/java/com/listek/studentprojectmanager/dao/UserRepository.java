package com.listek.studentprojectmanager.dao;

import com.listek.studentprojectmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
