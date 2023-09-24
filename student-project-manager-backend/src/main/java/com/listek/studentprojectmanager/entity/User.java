package com.listek.studentprojectmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "user")
@Data
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "email")
  private String email;

  @Column(name = "firstname")
  private String firstname;

  @Column(name = "lastname")
  private String lastname;

  @Column(name = "role")
  private String role;

  @Column(name = "password")
  private String password;

  @ManyToMany
  @JoinTable(
          name = "user_team",
          joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
          inverseJoinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"))
  private Set<Team> teams;

  @ManyToMany(mappedBy = "users")
  private Set<Task> tasks;
}
