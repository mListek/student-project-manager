package com.listek.studentprojectmanager.service;

import com.listek.studentprojectmanager.dto.UserDto;
import com.listek.studentprojectmanager.entity.Team;
import com.listek.studentprojectmanager.entity.User;

import java.util.List;

public interface UserService {
    User saveUser(UserDto userDto);

    User findUserByEmail(String email);

    void addUserToTeam(User user, Team team);
}
