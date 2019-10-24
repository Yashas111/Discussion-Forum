<?php
    //connect to database
    $conn = mysqli_connect('localhost','root','root123','dforum');

    //check connection
    if(!$conn){
        echo 'Connection error: '.mysqli_connect_error();
    }

    //write query to get all the user info
    $sql1 = 'SELECT * FROM users';

    //make and execute query
    $result = mysqli_query($conn, $sql1);
    //print($result);
    //fetch an array of rows
    $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
    print($users);
    //free the result memory
    mysqli_free_result($result);

    //close the connection to database
    mysqli_close($conn);

   // print_r($users);
?>