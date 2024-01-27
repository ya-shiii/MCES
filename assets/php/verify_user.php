<?php
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve user_id from POST data
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);

    // Update the user_list table to set verified to 'yes'
    $query = "UPDATE user_list SET verified = 'yes' WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Set success response
        $response = array('success' => true);
    } else {
        // Set error response
        $response = array('success' => false, 'message' => "Query failed: " . mysqli_error($conn));
    }
} else {
    // Set error response for invalid request method
    $response = array('success' => false, 'message' => 'Invalid request method');
}

// Output the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
