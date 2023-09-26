package com.listek.studentprojectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tasks")
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;


  @ManyToOne
  @JoinColumn(name = "team_id")
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private Team team;

  @Column(name = "description")
  private String description;

  @Column(name = "status")
  private String status;

  @ManyToMany(fetch = FetchType.LAZY,
          cascade = {
                  CascadeType.PERSIST,
                  CascadeType.MERGE
          })
  @JoinTable(name = "task_users",
          joinColumns = { @JoinColumn(name = "task_id") },
          inverseJoinColumns = { @JoinColumn(name = "user_id") })
  private Set<User> users = new HashSet<>();

  public Task() {
  }

  public Task(Team team, String description, String status) {
    this.team = team;
    this.description = description;
    this.status = status;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Team getTeam() {
    return team;
  }

  public void setTeam(Team team) {
    this.team = team;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Set<User> getUsers() {
    return users;
  }

  public void setUsers(Set<User> users) {
    this.users = users;
  }

  public void addUser(User user) {
    this.users.add(user);
    user.getTasks().add(this);
  }

  public void removeUser(long userId) {
    User user = this.users.stream().filter(t -> t.getId() == userId).findFirst().orElse(null);
    if (user != null) {
      this.users.remove(user);
      user.getTasks().remove(this);
    }
  }
}
