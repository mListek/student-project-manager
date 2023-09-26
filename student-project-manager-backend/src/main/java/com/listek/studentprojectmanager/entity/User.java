package com.listek.studentprojectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "email", unique = true)
  private String email;

  @Column(name = "password")
  private String password;

  @Column(name = "firstname")
  private String firstName;

  @Column(name = "lastname")
  private String lastName;

  @Column(name = "role")
  private String role;

  @ManyToMany(fetch = FetchType.LAZY,
          cascade = {
                  CascadeType.PERSIST,
                  CascadeType.MERGE
          })
  @JoinTable(name = "user_teams",
          joinColumns = { @JoinColumn(name = "user_id") },
          inverseJoinColumns = { @JoinColumn(name = "team_id") })
  private Set<Team> teams = new HashSet<>();

  @ManyToMany(fetch = FetchType.LAZY,
          cascade = {
                  CascadeType.PERSIST,
                  CascadeType.MERGE
          },
          mappedBy = "users")
  @JsonIgnore
  private Set<Task> tasks = new HashSet<>();

  public User() {
  }

  public User(String email, String password, String firstName, String lastName, String role) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public Set<Team> getTeams() {
    return teams;
  }

  public void setTeams(Set<Team> teams) {
    this.teams = teams;
  }

  public Set<Task> getTasks() {
    return tasks;
  }

  public void setTasks(Set<Task> tasks) {
    this.tasks = tasks;
  }

  public void addTeam(Team team) {
    this.teams.add(team);
    team.getUsers().add(this);
  }

  public void removeTeam(long teamId) {
    Team team = this.teams.stream().filter(t -> t.getId() == teamId).findFirst().orElse(null);
    if (team != null) {
      this.teams.remove(team);
      team.getUsers().remove(this);
    }
  }
}
