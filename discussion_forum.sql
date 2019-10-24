create database dforum;
use dforum;

create table user(
	id int primary key,
    uname varchar(100),
    email varchar(200) not null,
    password varchar(10) not null
);