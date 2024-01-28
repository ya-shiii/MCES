<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from POST
    $username = mysqli_real_escape_string($conn, $_POST['addUsername']);
    $first_name = mysqli_real_escape_string($conn, $_POST['addFirst_name']);
    $last_name = mysqli_real_escape_string($conn, $_POST['addLast_name']);
    $email = mysqli_real_escape_string($conn, $_POST['addEmail']);
    $password = password_hash($_POST['addPassword'], PASSWORD_DEFAULT); // Hash the password
    $department = mysqli_real_escape_string($conn, $_POST['addDepartment']);

    // Check for duplicates
    $duplicateCheckQuery = "SELECT * FROM user_list WHERE username = '$username' OR email = '$email'";
    $duplicateCheckResult = mysqli_query($conn, $duplicateCheckQuery);

    if (mysqli_num_rows($duplicateCheckResult) > 0) {
        $response = array('success' => false, 'message' => 'Username or email already exists');
        echo '<script>alert("Username or email already exists"); window.location.href = "../../user-management.html";</script>';
        exit;
    } else {
        // Perform the insertion into the database
        $insertQuery = "INSERT INTO user_list (username, first_name, last_name, email, password, department) 
                        VALUES ('$username', '$first_name', '$last_name', '$email', '$password', '$department')";

        $insertResult = mysqli_query($conn, $insertQuery);

        if ($insertResult) {
            $response = array('success' => true, 'message' => 'User added successfully');
            echo '<script>alert("User added successfully"); window.location.href = "../../user-management.html";</script>';
            exit;
        } else {
            $response = array('success' => false, 'message' => ': ' . mysqli_error($conn));
            echo '<script>alert("Error adding user '.mysqli_error($conn).'"); window.location.href = "../../user-management.html";</script>';
            exit;
        }
    }

} else {
    // Handle non-POST requests
    $response = array('success' => false, 'message' => 'Invalid request method');
    echo '<script>alert("Invalid request method"); window.location.href = "../../user-management.html";</script>';
    exit;
    
}
?>
