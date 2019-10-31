<?php
    include("./db.php");

    $id = $_GET["id"];

    $q = "select * from forum where id = $id";

    $result = mysqli_query($conn, $q);
    $row = mysqli_fetch_assoc($result);

    echo json_encode($row);
?>