<?php
include 'db_connect.php'; // Adjust the path based on your file structure

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $user_id = mysqli_real_escape_string($conn, $_POST['userId']);
    $username = mysqli_real_escape_string($conn, $_POST['editUsername']);
    $first_name = mysqli_real_escape_string($conn, $_POST['editFirst_name']);
    $last_name = mysqli_real_escape_string($conn, $_POST['editLast_name']);
    $email = mysqli_real_escape_string($conn, $_POST['editEmail']);
    $password = mysqli_real_escape_string($conn, $_POST['editPassword']);
    $department = mysqli_real_escape_string($conn, $_POST['editDepartment']);

    // Get user_id from the session
    if (isset($user_id)) {
        $query = "UPDATE user_list 
                  SET username = '$username', first_name = '$first_name', last_name = '$last_name', 
                      email = '$email', password = '$password', department = '$department' 
                  WHERE user_id = '$user_id'";

        $result = mysqli_query($conn, $query);

        if (!$result) {
            die("Query failed: " . mysqli_error($conn));
        }

        // Return a success message
        echo "<script>alert('Account updated successfully'); window.location.href='../../user-management.html';</script>";
        //echo json_encode(['success' => 'Account updated successfully']);
    } else {
        // Handle the case when the user is not logged in
        echo "<script>alert('Something went wrong.'); window.location.href='../../';</script>";
        //echo json_encode(['error' => 'User not logged in']);
    }
} else {
    // Handle non-POST requests
    echo "<script>alert('Invalid request method. You have been logged out'); window.location.href='logout.php';</script>";
    //echo json_encode(['error' => 'Invalid request method']);
    
}
?>
