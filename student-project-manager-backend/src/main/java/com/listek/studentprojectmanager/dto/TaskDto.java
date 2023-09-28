package com.listek.studentprojectmanager.dto;

public class TaskDto {

    private long teamId;
    private String description;
    private long userId;

    public TaskDto(long teamId, String description, long userId) {
        this.teamId = teamId;
        this.description = description;
        this.userId = userId;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
