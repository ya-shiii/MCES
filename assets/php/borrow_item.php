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
$full_name = $_SESSION['full_name'];

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $borrowerName = $full_name;
    $borrowerID = $userId;
    $location = $_POST['location'];
    $itemName = $_POST['item_name'];
    $itemType = $_POST['item_type'];
    $itemCount = $_POST['item_count'];

    // Insert record into request_log table
    $sqlRequestLog = "INSERT INTO request_log ( borrower_id, borrower_name, item_name, item_type, item_count, `action`, `location`)
    VALUES ('$borrowerID', '$borrowerName', '$itemName', '$itemType', '$itemCount', 'borrow', '$location')";
    if (!mysqli_query($conn, $sqlRequestLog)) {
        echo "Error updating request_log: " . mysqli_error($conn);
        exit(); // Stop further execution
    }

    // Close database connection
    mysqli_close($conn);

    // Return response to client-side JavaScript
    echo "<script>alert('Borrow requested successfully'); window.location.href = document.referrer;</script>";
} else {
    // If the form is not submitted, return an error message
    echo "Error: Form not submitted";
}
?>

