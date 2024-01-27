<?php
include 'db_connect.php';

// Fetch data from log_book and school_items tables
$query = "SELECT school_items.serial_code, school_items.item_name,
          COUNT(CASE WHEN MONTH(log_book.log_date) = MONTH(CURRENT_DATE()) THEN 1 END) AS times_borrowed_this_month,
          COUNT(log_book.log_id) AS times_borrowed_all_time
          FROM school_items
          LEFT JOIN log_book ON school_items.serial_code = log_book.serial_code
          GROUP BY school_items.serial_code, school_items.item_name";

$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query failed: " . mysqli_error($conn));
}

$logData = array();

while ($row = mysqli_fetch_assoc($result)) {
    $logData[] = $row;
}

mysqli_free_result($result);

// Return the log data as JSON
header('Content-Type: application/json');
echo json_encode($logData);
?>
