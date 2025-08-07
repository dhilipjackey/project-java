package com.movie.Moviebackend.controller;

public class StatusUpdate {
    private String status;

    public StatusUpdate() {
    }

    public StatusUpdate(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
