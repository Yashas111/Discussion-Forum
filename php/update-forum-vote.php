<?php
    include("./db.php");
    
    $id = $_GET["forumid"];
    $voteType = $_GET["votetype"];

    $q = "update forum set $voteType = $voteType + 1 where id = $id";
    $res = mysqli_query($conn, $q);
    
    echo 200;
?>