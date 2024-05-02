<?php
// Include your database connection file
include 'db_connect.php';

// Check if serial_code is set in the POST request
if (isset($_POST['scannedQR'])) {
    // Sanitize the input to prevent SQL injection
    $qr_serial = mysqli_real_escape_string($conn, $_POST['scannedQR']);

    // Query to fetch item data based on qr_serial
    $query = "SELECT * FROM school_items WHERE qr_serial = '$qr_serial'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Check if any row is returned
        if (mysqli_num_rows($result) > 0) {
            $itemData = mysqli_fetch_assoc($result);

            // Set proper content type header
            header('Content-Type: application/json');

            // Return item data as JSON
            echo json_encode($itemData);
        } else {
            // No matching item found
            echo json_encode(['error' => 'Item not found']);
        }
    } else {
        // Error in the query
        echo json_encode(['error' => mysqli_error($conn)]);
    }
} else {
    // qr_serial not set in the POST request
    echo json_encode(['error' => 'qr_serial not provided']);
}

// Close the database connection
mysqli_close($conn);
?>
