<?php
// Include your database connection file
include_once 'db_connect.php';
session_start();
$user_id = $_SESSION['user_id'];

// Prepare and execute the query to update user notifications
$stmt = $conn->prepare("UPDATE log_book SET user_notif = '1' WHERE user_id='$user_id'");
$stmt->execute();

// Check if the update was successful
if ($stmt->affected_rows > 0) {
    // If at least one row was affected, send a success response
    $response = array(
        'success' => true,
        'message' => 'User notifications updated successfully'
    );
} else {
    // If no rows were affected, send an error response
    $response = array(
        'success' => false,
        'message' => 'Failed to update user notifications'
    );
}

// Close the database connection
$conn->close();

// Send the JSON response
echo json_encode($response);
?>
