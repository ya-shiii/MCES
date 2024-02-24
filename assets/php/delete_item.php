<?php
include 'db_connect.php';

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve serial_code from POST data
    $qr_serial = mysqli_real_escape_string($conn, $_POST['qr_serial']);
    $reason = mysqli_real_escape_string($conn, $_POST['reason']);
    $current_time = date('Y-m-d H:i:s'); // Get the current timestamp

    // Perform the deletion and update in the database
    $query = "UPDATE school_items SET disposed_at = '$current_time', reason_for_disposal = '$reason', item_status='Disposed' WHERE qr_serial = '$qr_serial'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Success message with redirection
        echo '<script>';
        echo 'alert("Item deleted successfully.");';
        echo 'window.location.href = "../../tracking.html";';
        echo '</script>';
        exit;
    } else {
        // Error message
        echo '<script>alert("Error: ' . mysqli_error($conn) . '");</script>';
        exit;
    }
    
}

// Output the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
