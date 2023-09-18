package com.listek.studentprojectmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "team")
@Data
public class Team {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "code")
  private String code;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "team")
  private Set<Message> messages;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "team")
  private Set<Task> tasks;

  @ManyToMany
  @JoinTable(
    name = "user_team",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "team_id"))
  private Set<User> users;
}
