<?php
include 'db_connect.php'; // Adjust the path based on your file structure

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve user_id from GET data
    $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);

    // Perform the database query to fetch user data
    $query = "SELECT * FROM user_list WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    // Check if user with the given user_id exists
    if (mysqli_num_rows($result) > 0) {
        // Fetch user data
        $user_data = mysqli_fetch_assoc($result);

        // Return user data as JSON
        header('Content-Type: application/json');
        echo json_encode($user_data);
    } else {
        // Return an error message if user not found
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'User not found'));
    }
} else {
    // Handle non-GET requests
    header('Content-Type: application/json');
    echo json_encode(array('error' => 'Invalid request method'));
}
?>
