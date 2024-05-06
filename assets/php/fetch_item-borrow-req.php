<?php
include 'db_connect.php';

// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo 'User not logged in.';
    exit();
}

// Get user ID from the session
$userId = $_SESSION['user_id'];
$full_name = $_SESSION['full_name'];

$query = "SELECT * FROM request_log WHERE borrower_id = '$userId'";
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
