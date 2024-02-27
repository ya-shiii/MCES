<?php
// Include your database connection file
include_once 'db_connect.php';

// Initialize an empty array to store the total items for the last 6 weeks
$totalItemsArray = array();

// Get the current date and time
$currentDate = date('Y-m-d');

// Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
$dayOfWeek = date('w', strtotime($currentDate));

// Calculate the start and end dates for the first week (from last Sunday to today)
$startDate = date('Y-m-d', strtotime("-" . ($dayOfWeek) . " days", strtotime($currentDate)));
$endDate = $currentDate;

// Prepare and execute a database query to count the entries within the first week
$stmt = $conn->prepare("SELECT COUNT(*) AS total_entries FROM school_items WHERE DATE(acquired_at) BETWEEN ? AND ?");
$stmt->bind_param('ss', $startDate, $endDate);
$stmt->execute();
$result = $stmt->get_result();

// Fetch the total number of entries within the first week
$row = $result->fetch_assoc();
$totalItems = $row['total_entries'];

// Store the total number of entries for the first week in the array
$totalItemsArray[] = $totalItems;

// Generate the date range for the remaining 5 weeks (each week from last Sunday to last Saturday)
for ($i = 1; $i < 6; $i++) {
    // Calculate the start date of the current week (last Sunday of previous week)
    $startDate = date('Y-m-d', strtotime("-" . (($i * 7) + ($dayOfWeek)) . " days", strtotime($currentDate)));
    // Calculate the end date of the current week (last Saturday)
    $endDate = date('Y-m-d', strtotime("-" . (($i * 7) + ($dayOfWeek) - 6) . " days", strtotime($currentDate)));

    // Prepare and execute a database query to count the entries within the current week
    $stmt = $conn->prepare("SELECT COUNT(*) AS total_entries FROM school_items WHERE DATE(acquired_at) BETWEEN ? AND ?");
    $stmt->bind_param('ss', $startDate, $endDate);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch the total number of entries within the current week
    $row = $result->fetch_assoc();
    $totalItems = $row['total_entries'];

    // Store the total number of entries for the current week in the array
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
    'message' => 'Total items for the last 6 weeks retrieved successfully'
);

// Send the JSON response
echo json_encode($response);
?>
