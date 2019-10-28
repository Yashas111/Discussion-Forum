<?php
$conn = mysqli_connect('localhost','KnightShade','dragon391','dforum');
    $email=$_POST['email'];
    $uname=$_POST['user_name'];
    $pass=$_POST['password'];
    $cpass=$_POST['password_confirmation'];

    if($pass == $cpass){
        //print('Account created');
        $q = "INSERT INTO users VALUES('$email','$uname','$pass')" ;
        //$q = 'SELECT * from users';
        echo '<h1 style="text-align:center">Please <a href="./login.html">login</a> to continue</h1>';
        mysqli_query($conn, $q);
    }else
        echo '<h1 style="text-align:center">Please <a href="./signup.html">confirm</a> the password</h1>';
    
    mysqli_close($conn);
?>


