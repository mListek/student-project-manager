package com.listek.studentprojectmanager.dao;

import com.listek.studentprojectmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findById(long userId);
}
