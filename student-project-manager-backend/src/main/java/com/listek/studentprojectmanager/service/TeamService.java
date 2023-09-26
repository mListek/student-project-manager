package com.listek.studentprojectmanager.service;

import com.listek.studentprojectmanager.entity.Team;
import com.listek.studentprojectmanager.entity.User;

public interface TeamService {
    void saveTeam(Team team);

    Team findTeamByCode(String code);

    void createTeamAndAddUser(User user);
}
