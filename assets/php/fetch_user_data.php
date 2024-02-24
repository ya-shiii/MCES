<?php
session_start();

// For fetching user data
$userData = array(
    'user_id' => $_SESSION['user_id'],
    'full_name' => $_SESSION['full_name']
);

// Return the user data as JSON
header('Content-Type: application/json');
echo json_encode($userData);
?>
