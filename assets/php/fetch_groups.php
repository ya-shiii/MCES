<?php
// Include your database connection
include 'db_connect.php';

// Fetch groups from the database
$query = "SELECT * FROM `group` ORDER BY name ASC";
$result = mysqli_query($conn, $query);

if ($result) {
    $groups = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $groups[] = $row;
    }
    echo json_encode($groups);
} else {
    echo json_encode(array('error' => 'Failed to fetch groups'));
}

// Close database connection
mysqli_close($conn);
?>
