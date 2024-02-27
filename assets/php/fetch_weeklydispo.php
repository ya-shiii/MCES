<?php
include 'db_connect.php';

// Get the current date
$currentDate = date('Y-m-d');

// Prepare an array to store the results
$results = array();

// Iterate through the last 7 days
for ($i = 0; $i < 7; $i++) {
    // Calculate the date
    $date = date('Y-m-d', strtotime("-$i days", strtotime($currentDate)));

    // Prepare and execute the query to get the total number of disposed items for the current date
    $stmt = $conn->prepare("SELECT COUNT(*) AS total_disposed FROM school_items WHERE item_status = 'Disposed' AND DATE(disposed_at) = ?");
    $stmt->bind_param("s", $date);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // Store the result in the array
    $results[] = $row['total_disposed'];
}

// Reverse the order of the total items array
$results = array_reverse($results);

// Prepare the JSON response
$response = array(
    'success' => true,
    'data' => $results,
    'message' => 'Total disposed items for the last 7 days retrieved successfully'
);

// Send the JSON response
echo json_encode($response);
?>
