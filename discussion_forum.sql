-- create database dforum;
use dforum;

-- create table users(
--     email varchar(200) not null primary key,
--     uname varchar(100),
--     password varchar(10) not null
-- );

-- create table forum (
--     id int primary key auto_increment,
--     title varchar(200),
--     category varchar(20),
--     description varchar(5000),
--     email varchar(200),
--     uname varchar(100),
--     date varchar(25)
-- );

-- create table vote (
--     type int,
--     forumid int, 
--     email varchar(200)
-- );

create table comment (
    id int primary key auto_increment,
    text varchar(200),
    email varchar(200),
    uname varchar(100),
    date varchar(25),
    forumid int 
);