<?php
    include("./db.php");
    
    $email=$_POST['email'];
    $uname=$_POST['name'];
    $pass=$_POST['password'];
    $q1 = "SELECT * from users where email='$email' or uname='$uname'";
    //print($q1);
    $log = mysqli_query($conn, $q1);
    //print($log);
    $row = mysqli_fetch_assoc($log);

    if($row) {
        echo 201;
    } else {
        //print('Account created');
        $q = "INSERT INTO users VALUES('$email','$uname','$pass')";
        //$q = 'SELECT * from users';
        mysqli_query($conn, $q);
        echo 200;
    }
?>


