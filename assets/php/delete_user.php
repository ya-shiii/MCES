<?php
include 'db_connect.php'; // Adjust the path based on your file structure

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve user_id from POST data
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);

    // Perform the deletion in the database
    $query = "DELETE FROM user_list WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    // Respond with a JSON success message
    $response = array('success' => true);
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Handle non-POST requests
    $response = array('success' => false, 'message' => 'Invalid request method');
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
