<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve log_id from POST data
    $log_id = mysqli_real_escape_string($conn, $_POST['log_id']);

    // Perform the update in the database
    $query = "UPDATE log_book SET status = 'approved' WHERE log_id = '$log_id'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $response['success'] = true;
    } else {
        $response['message'] = "Query failed: " . mysqli_error($conn);
    }
} else {
    // Handle non-POST requests
    $response['message'] = 'Invalid request method';
}

// Output only the JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
