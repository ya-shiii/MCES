<?php
// Include your database connection file
include_once 'db_connect.php';

// Prepare and execute the query to update admin notifications
$stmt = $conn->prepare("UPDATE log_book SET admin_notif = '1'");
$stmt->execute();

// Check if the update was successful
if ($stmt->affected_rows > 0) {
    // If at least one row was affected, send a success response
    $response = array(
        'success' => true,
        'message' => 'Admin notifications updated successfully'
    );
} else {
    // If no rows were affected, send an error response
    $response = array(
        'success' => false,
        'message' => 'Failed to update admin notifications'
    );
}

// Close the database connection
$conn->close();

// Send the JSON response
echo json_encode($response);
?>
