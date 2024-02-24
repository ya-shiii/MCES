<?php
// Include your database connection file here
include_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data

    // Sanitize the input to prevent SQL injection
    $itemName = mysqli_real_escape_string($conn, $_POST['item_name']);
    $type = mysqli_real_escape_string($conn, $_POST['type']);
    $totalItems = $_POST['total_items'];
    $pricePerItem = $_POST['price_per_item'];
    $modeOfProcurement = mysqli_real_escape_string($conn, $_POST['mode_of_procurement']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $warrantyExpiryDate = $_POST['warranty_expiry_date'];
    $manufacturer = mysqli_real_escape_string($conn, $_POST['manufacturer']);
    $lifespan = $_POST['lifespan'];
    $current_time = date('Y-m-d H:i:s'); // Get the current timestamp
    $location = "School"; // Assuming location is fixed as "School" for all entries

    // Calculate total price
    $totalPrice = $totalItems * $pricePerItem;

    // Insert data into the school asset table
    $sql = "INSERT INTO school_asset (name, type, number_of_items, price_per_item, total_price, mode_of_procurement, location, acquired_at) VALUES ('$itemName', '$type', $totalItems, $pricePerItem, $totalPrice, '$modeOfProcurement', '$location', '$current_time')";

    // Execute the query
    if (mysqli_query($conn, $sql)) {
        // Retrieve the asset_id of the inserted entry
        $assetId = mysqli_insert_id($conn);
        $qrSerials = array();

        // Loop to insert school items based on total_items
        for ($i = 1; $i <= $totalItems; $i++) {
            // Construct the qr_serial in the specified format
            $qrSerial = "MCES" . date('Y') . "00" . $assetId . $i;
            $qrSerials[] = $qrSerial; // Store the QR serial in an array

            // Insert data into the school items table
            $sql2 = "INSERT INTO school_items (qr_serial, item_name, description, type, mode_of_procurement, warranty_expiry_date, manufacturer, lifespan, expected_end_date, acquired_at, location) VALUES ('$qrSerial', '$itemName', '$description', '$type', '$modeOfProcurement', '$warrantyExpiryDate', '$manufacturer', '$lifespan', DATE_ADD('$current_time', INTERVAL '$lifespan' YEAR), '$current_time', '$location')";

            // Execute the query
            mysqli_query($conn, $sql2);
        }

        // Set success message if all insertions are successful
        $response = $qrSerials;
    } else {
        $response = "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    // Close database connection
    mysqli_close($conn);

    // Return response to client-side JavaScript
    echo json_encode($response);
} else {
    // If the form is not submitted, return an error message
    echo "Error: Form not submitted";
}
?>
