package com.listek.studentprojectmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user")
@Data
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
}
