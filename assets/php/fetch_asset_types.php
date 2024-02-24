<?php
// Include your database connection file here
include_once 'db_connect.php';

// Query to fetch options from asset_type table
$query = "SELECT `name` FROM asset_type ORDER BY name ASC";
$result = mysqli_query($conn, $query);

$options = array();
// Check if query was successful
if ($result && mysqli_num_rows($result) > 0) {
    // Loop through each row and add option to array
    while ($row = mysqli_fetch_assoc($result)) {
        $options[] = $row;
    }
}

// Close database connection
mysqli_close($conn);

// Send JSON response
header('Content-Type: application/json');
echo json_encode($options);
?>
