<?php
include 'db_connect.php';

// Get the current date
$currentDate = date('Y-m-d');

// Prepare an array to store the total borrowed items for each day
$totalBorrowedItemsArray = array();

// Iterate through the last 7 days
for ($i = 0; $i < 7; $i++) {
    // Calculate the date
    $date = date('Y-m-d', strtotime("-$i days", strtotime($currentDate)));
    
    // Prepare and execute the query to get the total number of borrowed items for the current date
    $stmt = $conn->prepare("SELECT COUNT(*) AS total_borrowed FROM log_book WHERE action_type = 'borrow' AND DATE(log_date) = ?");
    $stmt->bind_param("s", $date);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // Store the total borrowed items for the current day in the array
    $totalBorrowedItemsArray[] = $row['total_borrowed'];
}

// Close the database connection
$stmt->close();
$conn->close();

// Prepare the JSON response
$response = array(
    'success' => true,
    'data' => array_reverse($totalBorrowedItemsArray), // Reverse the array to match the order of days (from oldest to newest)
    'message' => 'Total borrowed items for the last 7 days retrieved successfully'
);

// Send the JSON response
echo json_encode($response);
?>