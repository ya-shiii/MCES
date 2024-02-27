<?php
// Include your database connection file
include_once 'db_connect.php';

// Initialize an empty array to store the total borrowed items and corresponding months for the last 6 months
$totalBorrowedItemsArray = array();
$monthLabels = array();

// Get the current date
$currentDate = date('Y-m-d');

// Generate the date range for the last 6 months
for ($i = 0; $i < 6; $i++) {
    // Calculate the start and end dates for the current month in the loop
    $startDate = date('Y-m-01', strtotime("-" . $i . " months", strtotime($currentDate)));
    $endDate = date('Y-m-t', strtotime("-" . $i . " months", strtotime($currentDate)));

    // Prepare and execute the query to get the total number of borrowed items within the current month
    $stmt = $conn->prepare("SELECT COUNT(*) AS total_borrowed FROM log_book WHERE action_type = 'borrow' AND DATE(log_date) BETWEEN ? AND ?");
    $stmt->bind_param("ss", $startDate, $endDate);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // Store the total borrowed items for the current month in the array
    $totalBorrowedItemsArray[] = $row['total_borrowed'];
    
    // Store the label (month) for the current period in the array
    $monthLabels[] = date('F Y', strtotime($startDate));
}

// Reverse the order of the total borrowed items array and month labels array to match the chronological order of months
$totalBorrowedItemsArray = array_reverse($totalBorrowedItemsArray);
$monthLabels = array_reverse($monthLabels);

// Close the database connection
$stmt->close();
$conn->close();

// Prepare the JSON response
$response = array(
    'success' => true,
    'data' => $totalBorrowedItemsArray,
    'message' => 'Total borrowed items for the past 6 months retrieved successfully'
);

// Send the JSON response
echo json_encode($response);
?>
