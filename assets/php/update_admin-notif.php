<?php
// Include your database connection file
include_once 'db_connect.php';

// Initialize response array
$response = array(
    'log_book_update' => array(
        'success' => false,
        'message' => 'Failed to update admin notifications in log_book'
    ),
    'request_log_update' => array(
        'success' => false,
        'message' => 'Failed to update admin notifications in request_log'
    )
);

// Prepare the query to update admin notifications in log_book
$stmt_log_book = $conn->prepare("UPDATE log_book SET admin_notif = '1'");

// Execute the query for log_book
if ($stmt_log_book->execute()) {
    // Check if any rows were affected
    if ($stmt_log_book->affected_rows > 0) {
        $response['log_book_update'] = array(
            'success' => true,
            'message' => 'Admin notifications updated successfully in log_book'
        );
    } else {
        $response['log_book_update']['message'] = 'No rows were updated in log_book';
    }
} else {
    $response['log_book_update']['message'] = 'Error executing query for log_book: ' . $stmt_log_book->error;
}

// Prepare the query to update admin notifications in request_log
$stmt_request_log = $conn->prepare("UPDATE request_log SET admin_notif = '1'");

// Execute the query for request_log
if ($stmt_request_log->execute()) {
    // Check if any rows were affected
    if ($stmt_request_log->affected_rows > 0) {
        $response['request_log_update'] = array(
            'success' => true,
            'message' => 'Admin notifications updated successfully in request_log'
        );
    } else {
        $response['request_log_update']['message'] = 'No rows were updated in request_log';
    }
} else {
    $response['request_log_update']['message'] = 'Error executing query for request_log: ' . $stmt_request_log->error;
}

// Close the database connection
$conn->close();

// Send the JSON response
echo json_encode($response);
?>
