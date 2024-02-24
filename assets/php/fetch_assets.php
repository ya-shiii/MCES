<?php
include 'db_connect.php';

$query = "SELECT * FROM school_asset";
$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query failed: " . mysqli_error($conn));
}

$itemData = array();

while ($row = mysqli_fetch_assoc($result)) {
    $itemData[] = $row;
}

mysqli_free_result($result);

// Return the item data as JSON
header('Content-Type: application/json');
echo json_encode($itemData);
?>
