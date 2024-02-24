<?php
// Include your database connection file
include('db_connect.php');

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the values from the POST request
    $qrSerialHidden = $_POST['qr_serial_hidden'];
    $itemName = $_POST['editItem_name'];
    $itemType = $_POST['edit_item_type'];
    $modeOfProcurement = $_POST['edit_mode_of_procurement'];
    $warrantyExpiration = $_POST['edit_warranty_expiration'];
    $serialNumber = $_POST['edit_serial_number'];
    $manufacturer = $_POST['edit_manufacturer'];
    $lifespan = $_POST['edit_lifespan'];
    $currentLocation = $_POST['edit_current_location'];
    $editedAt = date('Y-m-d H:i:s'); // Get the current date and time

    // Update the item in the database
    $updateQuery = "UPDATE school_items SET 
                    item_name = '$itemName', 
                    `type` = '$itemType', 
                    mode_of_procurement = '$modeOfProcurement', 
                    warranty_expiry_date = '$warrantyExpiration', 
                    serial_number = '$serialNumber', 
                    manufacturer = '$manufacturer', 
                    lifespan = '$lifespan', 
                    `location` = '$currentLocation', 
                    edited_at = '$editedAt' 
                    WHERE qr_serial = '$qrSerialHidden'";
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