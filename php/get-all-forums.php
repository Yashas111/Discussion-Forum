<?php
    include("./db.php");
    
    $q = "Select * from forum";
    $rows = mysqli_query($conn, $q);
    $response = $rows->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($response);
?>