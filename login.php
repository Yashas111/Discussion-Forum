<?php
    $conn = mysqli_connect('localhost','root','root123','dforum');
    $email = $_POST['email'];
    $password = $_POST['password'];

    $q1 = "SELECT * from users where email='$email'";
    //print($q1);
    $log = mysqli_query($conn, $q1);
    //print($log);
    $pass = mysqli_fetch_assoc($log);
    //print($pass['password']);
    if($pass['password']==$password){
        echo '<h1 style="text-align:center">Welcome '.$pass["uname"].'</h1><br>';
        echo '<h3><a href="./homelog.html" class="btnSubmit" ><center> Go to Home </center></a></h3>';
    }
    else{
        echo '<h2 style="text-align:center">Incorrect USERNAME or PASSWORD</h2>';
        echo '<h3 style="text-align:center">Please <a href="./login.html">login</a> again</h3>';
    }

?>