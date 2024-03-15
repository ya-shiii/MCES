<?php
// Include your database connection file
include_once 'db_connect.php';
session_start();
$user_id = $_SESSION['user_id'];

// Prepare and execute the query to count pending borrow requests
$stmt = $conn->prepare("SELECT COUNT(*) AS pending_borrow_requests FROM log_book WHERE action_type = 'borrow' AND `status` = 'pending' AND user_notif= '0' AND user_id = '$user_id'");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$pendingBorrowRequests = $row['pending_borrow_requests'];

// Prepare and execute the query to count pending returns
$stmt = $conn->prepare("SELECT COUNT(*) AS pending_returns FROM log_book WHERE action_type = 'return' AND `status` = 'pending' AND user_notif= '0' AND user_id = '$user_id'");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$pendingReturns = $row['pending_returns'];

// Prepare and execute the query to count borrowed items
$stmt = $conn->prepare("SELECT COUNT(*) AS approved_borrows FROM log_book WHERE action_type = 'borrow' AND `status` = 'approved' AND user_notif= '0' AND user_id = '$user_id'");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$approvedBorrows = $row['approved_borrows'];

// Prepare and execute the query to count borrowed items
$stmt = $conn->prepare("SELECT COUNT(*) AS completed_reqs FROM log_book WHERE action_type = 'return' AND `status` = 'completed' AND user_notif= '0' AND user_id = '$user_id'");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$completedReqs = $row['completed_reqs'];

// Close the database connection
$conn->close();

// Prepare the response data
$response = array(
    'Pending Borrows' => $pendingBorrowRequests,
    'Pending Returns' => $pendingReturns,
    'Approved Borrows' => $approvedBorrows,
    'Completed Transactions' => $completedReqs
);

// Send the JSON response
echo json_encode($response);
?>