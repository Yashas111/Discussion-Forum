<?php
    include("./db.php");
    
    $forumId = $_POST["forumId"];
    $text = $_POST["comment_text"];
    $email = $_POST["email"];
    $uname = $_POST["uname"];
    $date = $_POST["date"];

    $q = "INSERT INTO comment(text, email, uname, date, forumid) VALUES('$text', '$email', '$uname', '$date', $forumId)";

    mysqli_query($conn, $q);

    echo 200;

?>