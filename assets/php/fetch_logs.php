<?php
include 'db_connect.php';

$query = "SELECT * FROM request_log WHERE `status` != 'completed' ORDER BY date_requested DESC";
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
