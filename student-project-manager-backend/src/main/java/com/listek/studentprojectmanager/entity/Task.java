package com.listek.studentprojectmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "task")
@Data
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "team_id")
  private Team team;

  @Column(name = "description")
  private String description;

  @Column(name = "status")
  private String status;

  @ManyToMany
  @JoinTable(
          name = "user_task",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "task_id"))
  private Set<User> users;
}
