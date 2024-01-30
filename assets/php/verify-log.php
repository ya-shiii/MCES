<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve log_id from POST data
    $log_id = mysqli_real_escape_string($conn, $_POST['log_id']);

    // Fetch action_type based on log_id
    $fetchQuery = "SELECT action_type FROM log_book WHERE log_id = '$log_id'";
    $fetchResult = mysqli_query($conn, $fetchQuery);

    if ($fetchResult) {
        $row = mysqli_fetch_assoc($fetchResult);
        $action_type = $row['action_type'];

        // Determine the status based on the action_type
        $status = ($action_type === 'return') ? 'completed' : 'approved';

        // Perform the update in the database
        $updateQuery = "UPDATE log_book SET status = '$status' WHERE log_id = '$log_id'";
        $updateResult = mysqli_query($conn, $updateQuery);

        if ($updateResult) {
            $response['success'] = true;
            $response['message'] = 'Status updated successfully.';
        } else {
            $response['message'] = "Query failed: " . mysqli_error($conn);
        }
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
