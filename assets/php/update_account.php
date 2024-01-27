<?php
include 'db_connect.php'; // Adjust the path based on your file structure

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($conn, $_POST['last_name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $department = mysqli_real_escape_string($conn, $_POST['department']);

    // Get user_id from the session
    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];

        // Update user information in the database
        $query = "UPDATE user_list 
                  SET username = '$username', first_name = '$first_name', last_name = '$last_name', 
                      email = '$email', password = '$password', department = '$department' 
                  WHERE user_id = '$user_id'";

        $result = mysqli_query($conn, $query);

        if (!$result) {
            die("Query failed: " . mysqli_error($conn));
        }

        // Return a success message
        echo "<script>alert('Account updated successfully'); window.location.href='../../account.html';</script>";
        //echo json_encode(['success' => 'Account updated successfully']);
    } else {
        // Handle the case when the user is not logged in
        echo "<script>alert('User not logged in'); window.location.href='../../';</script>";
        //echo json_encode(['error' => 'User not logged in']);
    }
} else {
    // Handle non-POST requests
    echo "<script>alert('Invalid request method. You have been logged out'); window.location.href='logout.php';</script>";
    //echo json_encode(['error' => 'Invalid request method']);
    
}
?>
