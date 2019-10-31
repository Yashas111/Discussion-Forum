<?php
    include("./db.php");
    
    $id = $_GET["commentid"];
    $voteType = $_GET["votetype"];

    $q = "update comment set $voteType = $voteType + 1 where id = $id";
    $res = mysqli_query($conn, $q);
    
    echo 200;
?>