<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from POST
    $username = mysqli_real_escape_string($conn, $_POST['addUsername']);
    $password = password_hash($_POST['addPassword'], PASSWORD_DEFAULT); // Hash the password
    $full_name = mysqli_real_escape_string($conn, $_POST['addFullName']);
    $email = mysqli_real_escape_string($conn, $_POST['addEmail']);
    $department = mysqli_real_escape_string($conn, $_POST['addDepartment']);
    $role = mysqli_real_escape_string($conn, $_POST['addRole']);
    $group = mysqli_real_escape_string($conn, $_POST['addGroup']);
    $contact_info = mysqli_real_escape_string($conn, $_POST['addContactInfo']);
    $description = mysqli_real_escape_string($conn, $_POST['addDescription']);
    $verified = 0;
    $current_time = date('Y-m-d H:i:s'); // Get the current timestamp

    // Check for duplicates
    $duplicateCheckQuery = "SELECT * FROM user_list WHERE username = '$username' OR email = '$email'";
    $duplicateCheckResult = mysqli_query($conn, $duplicateCheckQuery);

    if (mysqli_num_rows($duplicateCheckResult) > 0) {
        $response = array('success' => false, 'message' => 'Username or email already exists');
        echo '<script>alert("Username or email already exists. Please try again."); window.location.href = "../../";</script>';
        exit;
    } else {
        // Perform the insertion into the database
        $insertQuery = "INSERT INTO user_list (username, `password`, full_name, email, department, u_role, `group`, contact_information, u_description, created_on, verified) 
                VALUES ('$username', '$password', '$full_name', '$email', '$department', '$role', '$group', '$contact_info', '$description', '$current_time', '$verified')";

        $insertResult = mysqli_query($conn, $insertQuery);

        if ($insertResult) {
            $response = array('success' => true, 'message' => 'User added successfully');
            echo '<script>alert("Registered successfully. Please wait for admin approval"); window.location.href = "../../";</script>';
            exit;
        } else {
            $response = array('success' => false, 'message' => ': ' . mysqli_error($conn));
            echo '<script>alert("Error registering user ' . mysqli_error($conn) . '"); window.location.href = "../../";</script>';
            exit;
        }
    }

} else {
    // Handle non-POST requests
    $response = array('success' => false, 'message' => 'Invalid request method');
    echo '<script>alert("Invalid request method"); window.location.href = "../../";</script>';
    exit;

}
?>