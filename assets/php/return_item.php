<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve log_id from POST data
    $log_id = mysqli_real_escape_string($conn, $_POST['log_id']);

    // Update log_book table status to 'completed' based on log_id
    $updateLogBookQuery = "UPDATE log_book SET status = 'completed' WHERE log_id = '$log_id'";
    $updateLogBookResult = mysqli_query($conn, $updateLogBookQuery);

    if ($updateLogBookResult) {
        // Fetch item_name and qr_serial from log_book table
        $fetchItemQuery = "SELECT item_name, qr_serial FROM log_book WHERE log_id = '$log_id'";
        $fetchItemResult = mysqli_query($conn, $fetchItemQuery);

        if ($fetchItemResult && mysqli_num_rows($fetchItemResult) > 0) {
            $row = mysqli_fetch_assoc($fetchItemResult);
            $item_name = $row['item_name'];
            $qr_serial = $row['qr_serial'];

            // Update stock_items table
            $updateStockItemsQuery = "UPDATE stock_items SET borrowed_items = borrowed_items - 1, available_items = available_items + 1 WHERE item_name = '$item_name'";
            $updateStockItemsResult = mysqli_query($conn, $updateStockItemsQuery);

            // Update school_items table
            $updateSchoolItemsQuery = "UPDATE school_items SET item_status = 'In Stock' WHERE qr_serial = '$qr_serial'";
            $updateSchoolItemsResult = mysqli_query($conn, $updateSchoolItemsQuery);

            if ($updateStockItemsResult && $updateSchoolItemsResult) {
                $response['success'] = true;
                $response['message'] = 'Status updated successfully.';
            } else {
                $response['message'] = "Error updating stock_items or school_items: " . mysqli_error($conn);
            }
        } else {
            $response['message'] = "Error fetching item details from log_book: " . mysqli_error($conn);
        }
    } else {
        $response['message'] = "Error updating log_book: " . mysqli_error($conn);
    }
} else {
    // Handle non-POST requests
    $response['message'] = 'Invalid request method';
}

// Output only the JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
