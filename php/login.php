<?php
    include("./db.php");

    $email = $_POST['email'];
    $password = $_POST['password'];

    $q1 = "SELECT * from users where email='$email'";
    //print($q1);
    $log = mysqli_query($conn, $q1);
    //print($log);
    $pass = mysqli_fetch_assoc($log);
    //print($pass['password']);
    if($pass['password']==$password)
        echo "200|" . $pass["uname"];
    else
        echo "201|Incorrect email or password!";

?>