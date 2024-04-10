<?php
// Include your database connection file
include 'db_connect.php';

// Check if log_id is provided in the request
if(isset($_GET['log_id'])) {
    // Sanitize the input
    $log_id = $_GET['log_id'];

    // Prepare and execute the query to fetch data based on log_id
    $query = "SELECT * FROM request_log WHERE log_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $log_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any row is returned
    if($result->num_rows > 0) {
        // Fetch the data as an associative array
        $row = $result->fetch_assoc();

        // Convert the data to JSON format and echo it
        echo json_encode($row);
    } else {
        // No matching row found, return an error message
        echo json_encode(array('error' => 'No data found for the provided log_id.'));
    }

    // Close the statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // log_id parameter is missing, return an error message
    echo json_encode(array('error' => 'log_id parameter is missing.'));
}
?>
