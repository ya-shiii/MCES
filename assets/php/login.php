<?php
include 'db_connect.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if username is 'admin' and password is 'admin'
    if ($username === 'admin' && $password === 'admin') {
        // Set session variables for admin
        $_SESSION['user_id'] = 'admin';
        $_SESSION['full_name'] = 'Admin';

        // Set cookies for admin
        setcookie('user_id', 'admin', time() + 3600, '/');
        setcookie('full_name', 'Admin', time() + 3600, '/');

        // Redirect to the admin dashboard
        header('Location: ../../dashboard.html');
        exit();
    } else if ($username === 'admin' && $password !== 'admin') {
        echo "<script>alert('Invalid password for admin'); window.location.href='../../';</script>";
    } else {
        // Fetch user data from the database
        $query = "SELECT * FROM user_list WHERE username = '$username'";
        $result = mysqli_query($conn, $query);

        $u_password = password_hash($password, PASSWORD_DEFAULT); // Hash the password

        if (!$result) {
            die("Query failed: " . mysqli_error($conn));
        }

        $user = mysqli_fetch_assoc($result);

        if ($user) {
            // Verify the hashed password
            if (password_verify($password, $user['password'])) {
                // Check if the user is verified
                if ($user['verified'] == 0) {
                    // Alert the user that their account is not yet verified
                    echo "<script>alert('Your account is not yet verified. Please verify your account.'); window.location.href='../../';</script>";
                    exit();
                }

                // Set session variables
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['full_name'] = $user['full_name'];

                // Set cookies
                setcookie('user_id', $user['user_id'], time() + 3600, '/');
                setcookie('full_name', $user['full_name'], time() + 3600, '/');

                // Redirect to the home page
                header('Location: ../../home.html');
                exit();
            } else {
                // Incorrect password
                echo "<script>alert('Invalid password'); window.location.href='../../';</script>";
            }
        } else {
            // User not found
            echo "<script>alert('Invalid username'); window.location.href='../../';</script>";
        }
    }
}
?>