<?php
session_start();

// For fetching user data
$userData = array(
    'user_id' => $_SESSION['user_id'],
    'last_name' => $_SESSION['last_name']
);

// Return the user data as JSON
header('Content-Type: application/json');
echo json_encode($userData);
?>
