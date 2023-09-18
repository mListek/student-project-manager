package com.listek.studentprojectmanager.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "message")
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "label")
    private String label;

    // Temporary if annotation won't work
    // Can change type to Date - from tutorial
    // LocalDateTime currentTime = LocalDateTime.parse(LocalDateTime.now().toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    @Column(name = "date")
    @CreationTimestamp
    private LocalDateTime creationDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
