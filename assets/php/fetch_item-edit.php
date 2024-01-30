<?php
// Include your database connection file
include 'db_connect.php';

// Check if serial_code is set in the POST request
if (isset($_POST['serial_code'])) {
    // Sanitize the input to prevent SQL injection
    $serialCode = mysqli_real_escape_string($conn, $_POST['serial_code']);

    // Query to fetch item data based on serial_code
    $query = "SELECT * FROM school_items WHERE serial_code = '$serialCode'";
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
    // serial_code not set in the POST request
    echo json_encode(['error' => 'serial_code not provided']);
}

// Close the database connection
mysqli_close($conn);
?>
