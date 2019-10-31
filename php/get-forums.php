<?php
    include("./db.php");

    $q = "select * from forum";

    if(array_key_exists("category", $_GET)) {
        $category = $_GET["category"];
        $q = $q . " where category = '$category'";
    } else {
        $searchArray = explode("+", $_GET["value"]);
        $searchVal = implode(" ", $searchArray);
        $q = $q . " where lower(title) like '%" . $searchVal . "%'";
    }

    $rows = mysqli_query($conn, $q);
    $response = $rows->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($response);
?>