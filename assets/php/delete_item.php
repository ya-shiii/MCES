<?php
include 'db_connect.php';

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve serial_code from POST data
    $serial_code = mysqli_real_escape_string($conn, $_POST['serial_code']);

    // Perform the deletion in the database
    $query = "DELETE FROM school_items WHERE serial_code = '$serial_code'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Set success response
        $response['success'] = true;
    } else {
        // Set error response
        $response['message'] = "Query failed: " . mysqli_error($conn);
    }
} else {
    // Set error response for invalid request method
    $response['message'] = 'Invalid request method';
}

// Output the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
