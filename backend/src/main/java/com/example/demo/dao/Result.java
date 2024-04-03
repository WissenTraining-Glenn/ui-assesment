package com.example.demo.dao;

public class Result {
    Object data;
    boolean status;
    String error;

    public Result(Object data, boolean status, String error) {
        this.data = data;
        this.status = status;
        this.error = error;
    }
}
