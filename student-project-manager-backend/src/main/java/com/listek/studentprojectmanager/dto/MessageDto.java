package com.listek.studentprojectmanager.dto;

public class MessageDto {
    private String label;
    private long userId;
    private long teamId;

    public MessageDto(String label, long userId, long teamId) {
        this.label = label;
        this.userId = userId;
        this.teamId = teamId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }
}
