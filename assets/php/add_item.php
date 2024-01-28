<?php
// Include your database connection file here
include_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $serialCode = $_POST['serial_code'];
    $itemName = $_POST['item_name'];
    $totalItems = $_POST['total_items'];

    // Check for duplicate serial code
    $duplicateCheckQuery = "SELECT * FROM school_items WHERE serial_code = '$serialCode'";
    $duplicateCheckResult = mysqli_query($conn, $duplicateCheckQuery);

    if (mysqli_num_rows($duplicateCheckResult) > 0) {
        // Duplicate serial code found
        $response = array('success' => false, 'message' => 'Duplicate serial code. Please use a different one.');
    } else {
        // No duplicate, add the item to the database
        $addItemQuery = "INSERT INTO school_items (serial_code, item_name, total_items) VALUES ('$serialCode', '$itemName', $totalItems)";
        if (mysqli_query($conn, $addItemQuery)) {
            // Item added successfully
            $response = array('success' => true, 'message' => 'Item added successfully');
        } else {
            // Error adding item
            $response = array('success' => false, 'message' => 'Error adding item to the database');
        }
    }

    // Close database connection
    mysqli_close($conn);

    // Alert the user with the response message
    echo '<script>alert("' . $response['message'] . '");</script>';

    // Redirect to tracking.html
    echo '<script>window.location.href = "../../tracking.html";</script>';
} else {
    // If the form is not submitted, redirect to tracking.html
    header('Location: ../../tracking.html');
    exit();
}
?>
