<?php
    include("./db.php");
    
    $q = "select * from forum order by id desc";
    $rows = mysqli_query($conn, $q);
    $response = $rows->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($response);
?>