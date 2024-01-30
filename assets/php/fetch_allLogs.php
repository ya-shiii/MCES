<?php
include 'db_connect.php';

// Fetch all items based on session 'user_id' ordered by log_date in descending order
session_start();
$user_id = $_SESSION['user_id'];

$query = "SELECT * FROM log_book WHERE user_id = '$user_id' ORDER BY log_date DESC";
$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query failed: " . mysqli_error($conn));
}

$logData = array();

while ($row = mysqli_fetch_assoc($result)) {
    $logData[] = $row;
}

mysqli_free_result($result);

// Return the log data as JSON
header('Content-Type: application/json');
echo json_encode($logData);
?>
