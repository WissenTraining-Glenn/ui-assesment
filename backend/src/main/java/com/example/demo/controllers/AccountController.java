package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Account;
import com.example.demo.models.Transaction;
import com.example.demo.models.TransactionType;
import com.example.demo.repositories.AccountRepo;
import com.example.demo.repositories.TransactionRepo;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {
    @Autowired
    AccountRepo accdoa;

    @Autowired
    TransactionRepo trxdoa;

    @PostMapping("/register")
    public String createAccount(@RequestBody Account details) {
        if(details == null || details.getIfsc().equals("") || details.getName().equals("") || Integer.toString(details.getAccountNumber()).length()<6) {
            return "Invalid Input";
        }
        if(accdoa.existsByAccountNumber(details.getAccountNumber())){
            return "Account already exists";
        }
        Account acc = new Account();
        acc.setAccountNumber(details.getAccountNumber());
        acc.setIfsc(details.getIfsc());
        acc.setBalance(0);
        acc.setName(details.getName());
        accdoa.save(acc);
        return "Account created";
    }

    @PostMapping("/withdraw")
    public String withdraw(@RequestBody Transaction trx) {
        if(Integer.toString(trx.getFromAccount()).length()<6 || trx.getAmount()<=0){
            return "Invalid Input";
        }
        if(accdoa.existsByAccountNumber(trx.getFromAccount())){
            Account acc = accdoa.findByAccountNumber(trx.getFromAccount());
            if(acc.getBalance() >= trx.getAmount()){
                acc.setBalance(acc.getBalance() - trx.getAmount());
                accdoa.save(acc);
                Transaction transaction = new Transaction();
                transaction.setFromAccount(trx.getFromAccount());
                transaction.setToAccount(null);
                transaction.setAmount(trx.getAmount());
                transaction.setFromIfsc(trx.getFromIfsc());
                transaction.setType(TransactionType.WITHDRAW);
                trxdoa.save(transaction);
                return "Amount Withdrawn";
            }
            return "Insufficient Balance";
        }
        return "Account Not Found";
    }
    

    @PostMapping("/deposit")
    public String deposit(@RequestBody Transaction trx) {
        if(Integer.toString(trx.getToAccount()).length()<6 || trx.getAmount()<=0){
            return "Invalid Input";
        }
        if(accdoa.existsByAccountNumber(trx.getToAccount())){
            Account acc = accdoa.findByAccountNumber(trx.getToAccount());
            acc.setBalance(acc.getBalance() + trx.getAmount());
            accdoa.save(acc);
            Transaction transaction = new Transaction();
            transaction.setFromAccount(null);
            transaction.setToAccount(trx.getToAccount());
            transaction.setAmount(trx.getAmount());
            transaction.setToIfsc(trx.getToIfsc());
            transaction.setType(TransactionType.DEPOSIT);
            trxdoa.save(transaction);
            return "Amount Deposited";
        }
        return "Account Not Found";
    }

    @PostMapping("/chequeDeposit")
    public String chequeDeposit(@RequestBody Transaction trx) {
        if(Integer.toString(trx.getToAccount()).length()<6 || trx.getAmount()<=0 || Integer.toString(trx.getFromAccount()).length()<6){
            return "Invalid Input";
        }
        if(accdoa.existsByAccountNumber(trx.getToAccount()) && accdoa.existsByAccountNumber(trx.getFromAccount())){
            Account sender = accdoa.findByAccountNumber(trx.getFromAccount());
            Account receiver = accdoa.findByAccountNumber(trx.getToAccount());
            if(sender.getBalance() >= trx.getAmount()){
                sender.setBalance(sender.getBalance() - trx.getAmount());
                receiver.setBalance(receiver.getBalance() + trx.getAmount());
                accdoa.save(sender);
                accdoa.save(receiver);
                Transaction transaction = new Transaction();
                transaction.setFromAccount(trx.getFromAccount());
                transaction.setToAccount(trx.getToAccount());
                transaction.setAmount(trx.getAmount());
                transaction.setFromIfsc(trx.getFromIfsc());
                transaction.setToIfsc(trx.getToIfsc());
                transaction.setType(TransactionType.TRANSFER);
                trxdoa.save(transaction);
                return "Cheque Deposited";
            }
            return "Insufficient Balance";
        }
        return "Account Not Found";
    }

    @GetMapping("/balance/{accountNumber}/{ifsc}")
    public String getBalance(@PathVariable int accountNumber, @PathVariable String ifsc) {
        if(accountNumber == 0 || ifsc.equals("")) {
            return "Invalid Input";
        }
        if(accdoa.existsByAccountNumber(accountNumber)) {
            Account acc = accdoa.findByAccountNumber(accountNumber);
            if(acc.getIfsc().equals(ifsc)){
                return acc.getBalance().toString();
            }
            return "Account Not Found";
        }
        return "Account Not Found";
    }
}
