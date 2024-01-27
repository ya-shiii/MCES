<?php
include 'db_connect.php';

session_start();

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    $query = "SELECT * FROM user_list WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    $userData = mysqli_fetch_assoc($result);

    // Return the user data as JSON
    header('Content-Type: application/json');
    echo json_encode($userData);
} else {
    // Handle the case when the user is not logged in
    echo json_encode(['error' => 'User not logged in']);
}
?>
