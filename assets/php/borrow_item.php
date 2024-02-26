<?php
// Include your database connection file
include('db_connect.php');

// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo 'User not logged in.';
    exit();
}

// Get user ID from the session
$userId = $_SESSION['user_id'];

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the values from the POST request
    $qr_serial = $_POST['qr_serial'];
    $item_name = $_POST['item_name'];
    $location = $_POST['location'];
    $return_due = $_POST['return_due'];

    // Insert the borrow record into the log_book table
    $insertLogQuery = "INSERT INTO log_book (user_id, qr_serial, item_name, due_date, action_type) VALUES ('$userId', '$qr_serial', '$item_name', '$return_due', 'borrow')";
    $insertLogResult = mysqli_query($conn, $insertLogQuery);

    if ($insertLogResult) {
        // Update the school_items table
        $updateItemsQuery = "UPDATE school_items SET item_status = 'Borrowed', `location` = '$location' WHERE qr_serial = '$qr_serial'";
        $updateItemsResult = mysqli_query($conn, $updateItemsQuery);

        if ($updateItemsResult) {
            echo 'Borrow successful.';
            echo "<script>alert('Borrow application submitted. Please wait for administrator approval.'); window.location.href='../../items-list.html';</script>";
        } else {
            echo 'Error updating school_items table.';
            echo "<script>alert('Error in  borrow application.'); window.location.href='../../items-list.html';</script>";
        }
    } else {
        echo 'Error inserting record into log_book table.';
        echo "<script>alert('Error inserting record into log book.'); window.location.href='../../items-list.html';</script>";
    }
} else {
    // Invalid request
    echo 'Invalid request.';
    echo "<script>alert('Invalid request.'); window.location.href='../../items-list.html';</script>";
}
?>
