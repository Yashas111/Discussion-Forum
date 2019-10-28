create database dforum;
use dforum;

create table users(
    email varchar(200) not null primary key,
    uname varchar(100),
    password varchar(10) not null
);

-- select * from users;