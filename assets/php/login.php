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
        $_SESSION['last_name'] = 'Admin';

        // Set cookies for admin
        setcookie('user_id', 'admin', time() + 3600, '/');
        setcookie('last_name', 'Admin', time() + 3600, '/');

        // Redirect to the admin dashboard
        header('Location: ../../dashboard.html');
        exit();
    } else if ($username === 'admin' && $password !== 'admin') {
        echo "<script>alert('Invalid password for admin'); window.location.href='../../';</script>";
    } else {
        // Validate user against the database
        $query = "SELECT * FROM user_list WHERE username = '$username' AND password = '$password'";
        $result = mysqli_query($conn, $query);

        if (!$result) {
            die("Query failed: " . mysqli_error($conn));
        }

        $user = mysqli_fetch_assoc($result);

        if ($user) {
            // Set session variables
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['last_name'] = $user['last_name'];

            // Set cookies
            setcookie('user_id', $user['user_id'], time() + 3600, '/');
            setcookie('last_name', $user['last_name'], time() + 3600, '/');

            // Redirect to home page
            header('Location: ../../home.html');
            exit();
        } else {
            echo "<script>alert('Invalid username or password'); window.location.href='../../';</script>";
        }
    }
}
?>
