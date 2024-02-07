<?php
include 'db_connect.php'; // Adjust the path based on your file structure

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $user_id = mysqli_real_escape_string($conn, $_POST['editUserId']);
    $username = mysqli_real_escape_string($conn, $_POST['editUsername']);
    $full_name = mysqli_real_escape_string($conn, $_POST['editFullName']);
    $group = mysqli_real_escape_string($conn, $_POST['editGroup']);
    $role = mysqli_real_escape_string($conn, $_POST['editRole']);
    $email = mysqli_real_escape_string($conn, $_POST['editEmail']);
    $contact_info = mysqli_real_escape_string($conn, $_POST['editContactInfo']);
    $password = password_hash($_POST['editPassword'], PASSWORD_DEFAULT);
    $department = mysqli_real_escape_string($conn, $_POST['editDepartment']);
    $description = mysqli_real_escape_string($conn, $_POST['editDescription']);

    // Get user_id from the session
    if (isset($user_id)) {
        $query = "UPDATE user_list 
                  SET username = '$username', full_name = '$full_name', `group` = '$group', 
                      email = '$email', `password` = '$password', department = '$department', u_role = '$role', u_description = '$description'
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
