<?php
include 'db_connect.php';

// Check if log_id is set in the POST request
if (isset($_POST['log_id'])) {
    // Sanitize the input to prevent SQL injection
    $logId = mysqli_real_escape_string($conn, $_POST['log_id']);

    // Query to update log_book table and set status to 'completed'
    $updateQuery = "UPDATE log_book SET status = 'completed' WHERE log_id = '$logId'";
    $updateResult = mysqli_query($conn, $updateQuery);

    if ($updateResult) {
        // Now, insert a new row with the same info, but action_type as 'return' and status as 'pending'
        $insertQuery = "INSERT INTO log_book (log_id, qr_serial, item_name, user_id, user_name, action_type, log_date, due_date, status) 
                        SELECT log_id, qr_serial, item_name, user_id, user_name, 'return', NOW(), due_date, 'pending' 
                        FROM log_book WHERE log_id = '$logId'";
        $insertResult = mysqli_query($conn, $insertQuery);

        if ($insertResult) {
            // Return success
            echo json_encode(['success' => true]);
            echo "<script>alert('Item returned. Please wait for admin confirmation.'); window.location.href='../../logs.html';</script>";
        } else {
            // Error inserting new row
            echo json_encode(['error' => 'Error inserting new row']);
            echo "<script>alert('Error with inserting new row.'); window.location.href='../../logs.html';</script>";
        }
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
