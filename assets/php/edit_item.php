<?php
// Include your database connection file
include('db_connect.php');

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the values from the POST request
    $oldSerialCode = $_POST['oldSerial_code'];
    $newSerialCode = $_POST['editSerial_code'];
    $itemName = $_POST['editItem_name'];
    $totalItems = $_POST['editTotal_items'];
    $borrowedItems = $_POST['borrowed_items'];
    $borrowable = $totalItems - $borrowedItems;

    // Check if the new serial code is different from the old one
    if ($oldSerialCode != $newSerialCode) {
        // Check for duplicate serial code in the database
        $duplicateCheckQuery = "SELECT * FROM school_items WHERE serial_code = '$newSerialCode'";
        $duplicateCheckResult = mysqli_query($conn, $duplicateCheckQuery);

        if (mysqli_num_rows($duplicateCheckResult) > 0) {
            // Duplicate serial code found
            echo '<script>alert("Duplicate serial code. Please choose a different one.");</script>';
            echo '<script>window.location.href = "../../tracking.html";</script>';
            exit();
        }
    }

    // Check if total_items is not less than borrowed_items
    if ($totalItems < $borrowedItems) {
        // Invalid total_items value
        echo '<script>alert("Total items must not be less than borrowed items.");</script>';
        echo '<script>window.location.href = "../../tracking.html";</script>';
        exit();
    }

    // Update the item in the database
    $updateQuery = "UPDATE school_items SET serial_code = '$newSerialCode', item_name = '$itemName', total_items = $totalItems, borrowable_items = $borrowable WHERE serial_code = '$oldSerialCode'";
    $updateResult = mysqli_query($conn, $updateQuery);

    if ($updateResult) {
        // Item updated successfully
        echo '<script>alert("Item updated successfully");</script>';
        echo '<script>window.location.href = "../../tracking.html";</script>';
    } else {
        // Error updating item
        echo '<script>alert("Error updating item");</script>';
        echo '<script>window.location.href = "../../tracking.html";</script>';
    }
} else {
    // Invalid request
    echo '<script>alert("Invalid request");</script>';
    echo '<script>window.location.href = "../../tracking.html";</script>';
}
?>
