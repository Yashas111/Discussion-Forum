<?php
    include("./db.php");
    
    $title = $_POST["title"];
    $category = $_POST["category"];
    $description = $_POST["description"];
    $email = $_POST["email"];
    $uname = $_POST["uname"];
    $date = $_POST["date"];

    $q = "INSERT INTO forum(title, category, description, email, uname, date, upvote_count, downvote_count) VALUES('$title', '$category', '$description', '$email', '$uname', '$date', 0, 0)";

    mysqli_query($conn, $q);

    echo 200;

?>