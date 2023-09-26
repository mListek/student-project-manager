package com.listek.studentprojectmanager.service;

import com.listek.studentprojectmanager.dao.TeamRepository;
import com.listek.studentprojectmanager.dao.UserRepository;
import com.listek.studentprojectmanager.entity.Team;
import com.listek.studentprojectmanager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TeamSerivceImpl implements TeamService{

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveTeam(Team team) {
    }

    @Override
    public Team findTeamByCode(String code) {
        return teamRepository.findByCode(code);
    }

    public void createTeamAndAddUser(User user) {
        Team team = new Team();
        team.setName("NG-001");
        team.setCode(UUID.randomUUID().toString().replace("-", "").substring(20));

        user.addTeam(team);

        teamRepository.save(team);
        userRepository.save(user);
    }
}
