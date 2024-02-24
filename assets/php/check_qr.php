<?php
// Include your database connection file
include_once 'db_connect.php';

// Check if the QR serial is provided in the GET parameters
if (isset($_GET['qr_serial'])) {
    // Get the QR serial from the GET parameters
    $qrSerial = $_GET['qr_serial'];

    // Prepare a SQL statement to check if the QR serial exists in the school_items table
    $sql = "SELECT COUNT(*) AS count FROM school_items WHERE qr_serial = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $qrSerial);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the query was successful
    if ($result) {
        // Fetch the result row
        $row = $result->fetch_assoc();
        
        // Check if the QR serial exists in the database
        if ($row['count'] > 0) {
            // If the QR serial exists, return a JSON response indicating that the QR code exists
            echo json_encode(['exists' => true]);
        } else {
            // If the QR serial does not exist, return a JSON response indicating that the QR code does not exist
            echo json_encode(['exists' => false]);
        }
    } else {
        // If the query failed, return a JSON response with an error message
        echo json_encode(['error' => 'Query failed']);
    }
} else {
    // If the QR serial is not provided in the GET parameters, return a JSON response with an error message
    echo json_encode(['error' => 'QR serial not provided']);
}
?>
