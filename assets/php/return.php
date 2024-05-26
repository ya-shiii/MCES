<?php
include 'db_connect.php';

// Check if log_id is set in the POST request
if (isset($_POST['log_id'])) {
    // Sanitize the input to prevent SQL injection
    $logId = mysqli_real_escape_string($conn, $_POST['log_id']);

    // Query to update log_book table and set status to 'completed'
    $updateQuery = "UPDATE log_book SET action_type = 'return', `status` = 'pending' WHERE log_id = '$logId'";
    $updateResult = mysqli_query($conn, $updateQuery);

    if ($updateResult) {
        echo json_encode(['success' => true]);
        echo "<script>alert('Item returned. Please wait for admin confirmation.'); window.location.href='../../logs.html';</script>";
    } else {
        // Error updating log_book table
        echo json_encode(['error' => 'Error updating log_book table']);
        echo "<script>alert('Error with updating log book.'); window.location.href='../../logs.html';</script>";
    }
} else {
    // log_id not set in the POST request
    echo json_encode(['error' => 'log_id not provided']);
    echo "<script>alert('Log ID does not exist.'); window.location.href='../../logs.html';</script>";
}

// Close the database connection
mysqli_close($conn);
?>