<?php
    include("./db.php");

    $id = $_GET["id"];

    $q = "Select *, (select count(*) from vote where vote.forumid = $id and type = 1) as uv_count, (select count(*) from vote where vote.forumid = $id and type = 0) as dv_count from forum where id = $id";

    $result = mysqli_query($conn, $q);
    $row = mysqli_fetch_assoc($result);

    echo json_encode($row);
?>