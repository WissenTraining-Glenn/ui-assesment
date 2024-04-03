create table account (
    account_number integer not null, 
    balance integer, 
    ifsc varchar(255), 
    name varchar(255), 
    primary key (account_number)
);

create table transaction (
    amount integer, 
    from_account integer, 
    id integer not null, 
    to_account integer, 
    from_ifsc varchar(255), 
    to_ifsc varchar(255), 
    type varchar(255) check (type in ('DEPOSIT','WITHDRAW','TRANSFER')), 
    primary key (id)
);

