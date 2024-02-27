<?php
// Include your database connection file
include_once 'db_connect.php';

// Initialize an empty array to store the total items and corresponding months for the last 6 months
$totalItemsArray = array();
$monthLabels = array();

// Get the current date
$currentDate = date('Y-m-d');

// Generate the date range for the last 6 months
for ($i = 0; $i < 6; $i++) {
    // Calculate the start and end dates for the current month in the loop
    $startDate = date('Y-m-01', strtotime("-" . $i . " months", strtotime($currentDate)));
    $endDate = date('Y-m-t', strtotime("-" . $i . " months", strtotime($currentDate)));

    // Prepare and execute a database query to get the total number of items added within the current month
    $stmt = $conn->prepare("SELECT COUNT(*) AS total_items FROM school_items WHERE DATE(acquired_at) BETWEEN ? AND ?");
    $stmt->bind_param('ss', $startDate, $endDate);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch the total number of items added within the current month
    $row = $result->fetch_assoc();
    $totalItems = $row['total_items'];

    // Store the total number of items for the current month in the array
    $totalItemsArray[] = $totalItems;
    
    // Store the label (month) for the current period in the array
    $monthLabels[] = date('F Y', strtotime($startDate));
}

// Reverse the order of the total items array and month labels array to match the chronological order of months
$totalItemsArray = array_reverse($totalItemsArray);
$monthLabels = array_reverse($monthLabels);

// Close the database connection
$stmt->close();
$conn->close();

// Prepare the JSON response
$response = array(
    'success' => true,
    'data' => array_map('intval', $totalItemsArray), // Convert the total items to integers
    'message' => 'Total items for the last 6 months retrieved successfully'
);

// Send the JSON response
echo json_encode($response);
?>
