<?php
// Include your database connection file
include_once 'db_connect.php';

// Initialize an empty array to store the total items for the last 7 days
$totalItemsArray = array();

// Get the current date and time
$currentDate = date('Y-m-d');

// Generate the date range for the last 7 days
for ($i = 0; $i < 7; $i++) {
    // Calculate the date for the current day in the loop
    $date = date('Y-m-d', strtotime("-$i days", strtotime($currentDate)));
    
    // Prepare and execute a database query to get the total number of items added on the current day
    $stmt = $conn->prepare("SELECT SUM(number_of_items) AS total_items FROM school_asset WHERE DATE(acquired_at) = ?");
    $stmt->bind_param('s', $date);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch the total number of items added on the current day
    $row = $result->fetch_assoc();
    $totalItems = $row['total_items'];

    // Store the total number of items for the current day in the array
    $totalItemsArray[] = $totalItems;
}


// Reverse the order of the total items array
$totalItemsArray = array_reverse($totalItemsArray);

// Close the database connection
$stmt->close();
$conn->close();

// Prepare the JSON response
$response = array(
    'success' => true,
    'data' => array_map('intval', $totalItemsArray), // Convert the total items to integers
    'message' => 'Total items for the last 7 days retrieved successfully'
);

// Send the JSON response
echo json_encode($response);
?>
