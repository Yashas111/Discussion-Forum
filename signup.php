<?php
    $conn = mysqli_connect('localhost','KnightShade','dragon391','dforum');
    $email=$_POST['email'];
    $uname=$_POST['name'];
    $pass=$_POST['password'];
    //print('Account created');
    $q = "INSERT INTO users VALUES('$email','$uname','$pass')";
    //$q = 'SELECT * from users';
    mysqli_query($conn, $q);
    echo "Done";
?>


