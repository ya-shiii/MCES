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
        // Fetch item_name from log_book table
        $fetchItemQuery = "SELECT item_name FROM log_book WHERE log_id = '$log_id'";
        $fetchItemResult = mysqli_query($conn, $fetchItemQuery);

        if ($fetchItemResult && mysqli_num_rows($fetchItemResult) > 0) {
            $row = mysqli_fetch_assoc($fetchItemResult);
            $item_name = $row['item_name'];

            // Update stock_items table
            $updateStockItemsQuery = "UPDATE stock_items SET borrowed_items = borrowed_items - 1, available_items = available_items + 1 WHERE item_name = '$item_name'";
            $updateStockItemsResult = mysqli_query($conn, $updateStockItemsQuery);

            if ($updateStockItemsResult) {
                // Update school_items table
                // Update school_items table
                $updateSchoolItemsQuery = "UPDATE school_items 
                    INNER JOIN log_book ON school_items.qr_serial = log_book.qr_serial
                    SET school_items.item_status = 'In Stock', school_items.location = (SELECT location FROM stock_items WHERE stock_items.item_name = '$item_name')
                    WHERE log_book.log_id = '$log_id'";

                $updateSchoolItemsResult = mysqli_query($conn, $updateSchoolItemsQuery);

                if ($updateSchoolItemsResult) {
                    $response['success'] = true;
                    $response['message'] = 'Status updated successfully.';
                } else {
                    $response['message'] = "Error updating school_items: " . mysqli_error($conn);
                }
            } else {
                $response['message'] = "Error updating stock_items: " . mysqli_error($conn);
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