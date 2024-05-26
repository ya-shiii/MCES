<?php
// Include your database connection file
include_once 'db_connect.php';
session_start();
$user_id = $_SESSION['user_id'];

// Initialize response array
$response = array(
    'log_book_update' => array(
        'success' => false,
        'message' => 'Failed to update user notifications in log_book'
    ),
    'request_log_update' => array(
        'success' => false,
        'message' => 'Failed to update user notifications in request_log'
    )
);

// Prepare the query to update user notifications in log_book
$stmt_log_book = $conn->prepare("UPDATE log_book SET user_notif = '1' WHERE user_id = ?");
$stmt_log_book->bind_param('s', $user_id);

// Execute the query for log_book
if ($stmt_log_book->execute()) {
    if ($stmt_log_book->affected_rows > 0) {
        $response['log_book_update'] = array(
            'success' => true,
            'message' => 'User notifications updated successfully in log_book'
        );
    } else {
        $response['log_book_update']['message'] = 'No rows were updated in log_book';
    }
} else {
    $response['log_book_update']['message'] = 'Error executing query for log_book: ' . $stmt_log_book->error;
}

// Prepare the query to update user notifications in request_log
$stmt_request_log = $conn->prepare("UPDATE request_log SET user_notif = '1' WHERE user_id = ?");
$stmt_request_log->bind_param('s', $user_id);

// Execute the query for request_log
if ($stmt_request_log->execute()) {
    if ($stmt_request_log->affected_rows > 0) {
        $response['request_log_update'] = array(
            'success' => true,
            'message' => 'User notifications updated successfully in request_log'
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
