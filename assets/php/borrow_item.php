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
    $serialCode = $_POST['serial_code'];
    $borrowItems = $_POST['borrow_items'];
    $availableItems = $_POST['borrowable_items'];

    // Check if borrow_items is more than available_items
    if ($borrowItems > $availableItems) {
        echo 'Error: Number of items to borrow exceeds available items.';
        echo "<script>alert('Number of items to borrow exceeds available items'); window.location.href='../../items-list.html';</script>";
        exit();
    }

    // Insert the borrow record into the log_book table
    $insertLogQuery = "INSERT INTO log_book (user_id, serial_code, action_type, num_items) VALUES ('$userId', '$serialCode', 'borrow', $borrowItems)";
    $insertLogResult = mysqli_query($conn, $insertLogQuery);

    if ($insertLogResult) {
        // Update the school_items table
        $updateItemsQuery = "UPDATE school_items SET items_borrowed = items_borrowed + $borrowItems, borrowable_items = borrowable_items - $borrowItems WHERE serial_code = '$serialCode'";
        $updateItemsResult = mysqli_query($conn, $updateItemsQuery);

        if ($updateItemsResult) {
            echo 'Borrow successful.';
            echo "<script>alert('Application submitted. Please wait for administrator approval.'); window.location.href='../../items-list.html';</script>";
        } else {
            echo 'Error updating school_items table.';
            echo "<script>alert('Error application to borrow'); window.location.href='../../items-list.html';</script>";
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
