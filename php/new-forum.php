<?php
    include("./db.php");
    
    $title = $_POST["title"];
    $category = $_POST["category"];
    $description = $_POST["description"];
    $email = $_POST["email"];
    $uname = $_POST["uname"];
    $date = $_POST["date"];

    $q = "INSERT INTO forum(title, category, description, email, uname, date) VALUES('$title', '$category', '$description', '$email', '$uname', '$date')";

    mysqli_query($conn, $q);

    echo 200;

?>