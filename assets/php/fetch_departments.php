<?php
// Include your database connection
include 'db_connect.php';

// Fetch departments from the database
$query = "SELECT * FROM department ORDER BY name ASC";
$result = mysqli_query($conn, $query);

if ($result) {
    $departments = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $departments[] = $row;
    }
    echo json_encode($departments);
} else {
    echo json_encode(array('error' => 'Failed to fetch departments'));
}

// Close database connection
mysqli_close($conn);
?>
