<?php
    include("./db.php");
    
    $category = $_GET["category"];

    $q = "Select *, (select count(*) from vote where vote.forumid = forum.id and type = 1) as uv_count, (select count(*) from vote where vote.forumid = forum.id and type = 0) as dv_count from forum where category = '$category'";
    $rows = mysqli_query($conn, $q);
    $response = $rows->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($response);
?>