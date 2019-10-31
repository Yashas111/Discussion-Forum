<?php
    include("./db.php");
    
    $forumId = $_POST["forumId"];
    $text = $_POST["comment_text"];
    $email = $_POST["email"];
    $uname = $_POST["uname"];
    $date = $_POST["date"];

    $q = "INSERT INTO comment(text, email, uname, date, forumid, upvote_count, downvote_count) VALUES('$text', '$email', '$uname', '$date', $forumId, 0, 0)";

    mysqli_query($conn, $q);

    echo 200;

?>