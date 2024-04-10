<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve log_id from POST data
    $log_id = mysqli_real_escape_string($conn, $_POST['log_id']);

    // Fetch action_type based on log_id
    $fetchQuery = "SELECT `action` FROM request_log WHERE log_id = '$log_id'";
    $fetchResult = mysqli_query($conn, $fetchQuery);

    if ($fetchResult) {
        $row = mysqli_fetch_assoc($fetchResult);
        $action_type = $row['action'];

        // Determine the status based on the action_type
        $status = ($action_type === 'return') ? 'completed' : 'approved';

        // Add the current date
        $current_date = date('Y-m-d H:i:s');

        // Perform the update in the database including the current date
        $updateQuery = "UPDATE request_log SET `status` = '$status', `date_approved` = '$current_date' WHERE log_id = '$log_id'";
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
