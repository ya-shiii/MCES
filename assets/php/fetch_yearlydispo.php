<?php
// Include your database connection file
include_once 'db_connect.php';

// Initialize an empty array to store the total disposed items for the last 6 months
$totalDisposedItemsArray = array();

// Get the current date
$currentDate = date('Y-m-d');

// Generate the date range for the last 6 months
for ($i = 0; $i < 6; $i++) {
    // Calculate the start and end dates for the current month in the loop
    $startDate = date('Y-m-01', strtotime("-" . $i . " months", strtotime($currentDate)));
    $endDate = date('Y-m-t', strtotime("-" . $i . " months", strtotime($currentDate)));

    // Prepare and execute the query to get the total number of disposed items within the current month
    $stmt = $conn->prepare("SELECT COUNT(*) AS total_disposed FROM school_items WHERE DATE(disposed_at) BETWEEN ? AND ?");
    $stmt->bind_param("ss", $startDate, $endDate);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // Store the total disposed items for the current month in the array
    $totalDisposedItemsArray[] = $row['total_disposed'];
}

// Reverse the order of the total disposed items array to match the chronological order of months
$totalDisposedItemsArray = array_reverse($totalDisposedItemsArray);

// Close the database connection
$stmt->close();
$conn->close();

// Prepare the JSON response
$response = array(
    'success' => true,
    'data' => $totalDisposedItemsArray,
    'message' => 'Total disposed items for the past 6 months retrieved successfully'
);

// Send the JSON response
echo json_encode($response);
?>
