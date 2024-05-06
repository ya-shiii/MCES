<?php
// Include your database connection file
include 'db_connect.php';

// Check if log_id is set in the POST request
if (isset($_POST['log_id'])) {
    // Sanitize the input to prevent SQL injection
    $log_id = mysqli_real_escape_string($conn, $_POST['log_id']);

    // Query to fetch item data based on log_id
    $query = "SELECT * FROM stock_items WHERE log_id = '$log_id'";
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
    // log_id not set in the POST request
    echo json_encode(['error' => 'log_id not provided']);
}

// Close the database connection
mysqli_close($conn);
?>
