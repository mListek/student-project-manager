package com.listek.studentprojectmanager.service;

import com.listek.studentprojectmanager.dto.UserDto;
import com.listek.studentprojectmanager.entity.User;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    List<UserDto> findAllUsers();
}
