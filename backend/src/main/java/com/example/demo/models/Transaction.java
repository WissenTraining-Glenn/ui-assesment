package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;



@Entity
public class Transaction {
    @Id
    @GeneratedValue
    private Integer ID;
    private Integer fromAccount;
    private Integer toAccount;
    private Integer amount;
    private String fromIfsc;
    private String toIfsc;
    @Enumerated(jakarta.persistence.EnumType.STRING)
    private TransactionType type;

    public Integer getID() {
        return ID;
    }
    public void setID(Integer ID) {
        this.ID = ID;
    }
    public Integer getFromAccount() {
        return fromAccount;
    }
    public void setFromAccount(Integer fromAccount) {
        this.fromAccount = fromAccount;
    }
    public Integer getToAccount() {
        return toAccount;
    }
    public void setToAccount(Integer toAccount) {
        this.toAccount = toAccount;
    }
    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
    public String getFromIfsc() {
        return fromIfsc;
    }
    public void setFromIfsc(String fromIfsc) {
        this.fromIfsc = fromIfsc;
    }
    public String getToIfsc() {
        return toIfsc;
    }
    public void setToIfsc(String toIfsc) {
        this.toIfsc = toIfsc;
    }
    public TransactionType getType() {
        return type;
    }
    public void setType(TransactionType type) {
        this.type = type;
    }
}
