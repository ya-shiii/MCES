<?php
// Include your database connection file
include_once 'db_connect.php';

// Fetch total assets from school_items
$stmt = $conn->prepare("SELECT COUNT(*) AS total_assets FROM school_items");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$totalAssets = $row['total_assets'];

// Fetch available assets from school_items
$stmt = $conn->prepare("SELECT SUM(available_items) AS available_assets FROM stock_items");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$availableAssets = $row['available_assets'];

// Fetch disposed assets from school_items
$stmt = $conn->prepare("SELECT SUM(disposed_items) AS disposed_assets FROM stock_items");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$disposedAssets = $row['disposed_assets'];

// Fetch borrowed assets from log_book
$stmt = $conn->prepare("SELECT SUM(borrowed_items) AS borrowed_assets FROM stock_items");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$borrowedAssets = $row['borrowed_assets'];

// Fetch pending borrow requests from log_book
$stmt = $conn->prepare("SELECT COUNT(*) AS pending_borrow_requests FROM log_book WHERE action_type = 'borrow' AND `status` = 'Pending'");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$pendingBorrowRequests = $row['pending_borrow_requests'];

// Fetch pending return requests from log_book
$stmt = $conn->prepare("SELECT COUNT(*) AS pending_return_requests FROM log_book WHERE action_type = 'return' AND `status` = 'Pending'");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$pendingReturnRequests = $row['pending_return_requests'];

// Fetch completed transactions from log_book
$stmt = $conn->prepare("SELECT COUNT(*) AS completed_transactions FROM log_book WHERE `status` = 'Completed'");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$completedTransactions = $row['completed_transactions'];

// Calculate inventory value from school_asset
$stmt = $conn->prepare("SELECT SUM(total_price) AS inventory_value FROM school_asset");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$inventoryValue = $row['inventory_value'];

// Close the database connection
$conn->close();

// Prepare the response as an associative array
$response = array(
    'TotalAssets' => $totalAssets,
    'AvailableAssets' => $availableAssets,
    'DisposedAssets' => $disposedAssets,
    'BorrowedAssets' => $borrowedAssets,
    'PendingBorrowRequests' => $pendingBorrowRequests,
    'PendingReturnRequests' => $pendingReturnRequests,
    'CompletedTransactions' => $completedTransactions,
    'InventoryValue' => $inventoryValue
);

// Send the JSON response
echo json_encode($response);
?>
