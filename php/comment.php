<?php
    include("./db.php");
    
    $id = $_GET["id"];

    $q = "select * from comment where forumid = $id";
    $rows = mysqli_query($conn, $q);
    $response = $rows->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($response);
?>