package com.listek.studentprojectmanager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "team_id")
  private Team team;

  @Column(name = "login")
  private String login;

  @Column(name = "isteacher")
  private boolean isTeacher;

  @Column(name = "password")
  private String password;

  public Long getId() {
    return id;
  }

  public Team getTeam() {
    return team;
  }

  public void setTeam(Team team) {
    this.team = team;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public boolean isTeacher() {
    return isTeacher;
  }

  public void setTeacher(boolean teacher) {
    isTeacher = teacher;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
