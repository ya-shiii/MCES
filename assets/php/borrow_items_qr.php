<?php
// Enable error reporting
//error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Include the database connection
include 'db_connect.php';

// Retrieve the JSON data from the request body
$json_data = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json_data, true);

// Check if the JSON data is valid
if ($data === null || !isset($data['log_id']) || !isset($data['qr_data']) || !isset($data['return_date']) || !isset($data['borrower_name']) || !isset($data['borrower_id']) || !isset($data['location']) || !isset($data['item_name']) || !isset($data['item_type'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Invalid or incomplete JSON data'));
    exit;
}

// Extract data from the JSON
$log_id = $data['log_id'];
$qr_data = $data['qr_data'];
$return_date = $data['return_date'];
$borrower_name = $data['borrower_name'];
$borrower_id = $data['borrower_id'];
$location = $data['location'];
$item_name = $data['item_name'];
$item_type = $data['item_type'];

// Start a transaction
$conn->begin_transaction();

// Update stock items
foreach ($qr_data as $qr_code) {
    $update_stock_sql = "UPDATE stock_items SET available_items = available_items - 1, borrowed_items = borrowed_items + 1, date_updated = NOW() WHERE item_name = '$item_name' AND item_type = '$item_type'";
    if (!$conn->query($update_stock_sql)) {
        // Rollback the transaction on failure
        $conn->rollback();
        http_response_code(500); // Internal Server Error
        echo json_encode(array('error' => "Failed to update stock item for QR code: $qr_code"));
        exit;
    }
}

// Update request logs
$update_request_logs_sql = "UPDATE request_log SET `status` = 'completed' WHERE log_id = $log_id";
if (!$conn->query($update_request_logs_sql)) {
    // Rollback the transaction on failure
    $conn->rollback();
    http_response_code(500); // Internal Server Error
    echo json_encode(array('error' => "Failed to update request log for log ID: $log_id"));
    exit;
}

// Update school items
foreach ($qr_data as $qr_code) {
    $update_school_items_sql = "UPDATE school_items SET `location` = '$location', item_status = 'Borrowed' WHERE qr_serial = '$qr_code'";
    if (!$conn->query($update_school_items_sql)) {
        // Rollback the transaction on failure
        $conn->rollback();
        http_response_code(500); // Internal Server Error
        echo json_encode(array('error' => "Failed to update school item for QR code: $qr_code"));
        exit;
    }
}

// Insert into log book
$due_date = date('Y-m-d H:i:s', strtotime($return_date)); // Convert return date to MySQL format
$action_type = 'borrow';
$log_status = 'pending';
foreach ($qr_data as $qr_code) {
    $insert_log_book_sql = "INSERT INTO log_book (log_id, qr_serial, item_name, user_id, user_name, action_type,  due_date, `status`) 
        VALUES ($log_id, '$qr_code', '$item_name', '$borrower_id', '$borrower_name', '$action_type', '$due_date', '$log_status')";
    if (!$conn->query($insert_log_book_sql)) {
        // Rollback the transaction on failure
        $conn->rollback();
        http_response_code(500); // Internal Server Error
        echo json_encode(array('error' => "Failed to insert log book entry for QR code: $qr_code"));
        exit;
    }
}

// Commit the transaction
$conn->commit();

// Respond with success message
echo json_encode(array('success' => true, 'message' => 'Data successfully processed'));

// Close connection
$conn->close();
?>
