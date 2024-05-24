<?php
include 'db_connect.php'; // Adjust the path based on your file structure

// Initialize the response array
$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve log_id from POST data
    $log_id = mysqli_real_escape_string($conn, $_POST['dispose_id']);
    $dispo_reason = $_POST['dispose_reason'];
    $current_time = date('Y-m-d H:i:s'); // Get the current timestamp

    
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
            $updateStockItemsQuery = "UPDATE stock_items SET borrowed_items = borrowed_items - 1, disposed_items = disposed_items + 1 WHERE item_name = '$item_name'";
            $updateStockItemsResult = mysqli_query($conn, $updateStockItemsQuery);

            if ($updateStockItemsResult) {
                // Update school_items table
                // Update school_items table
                $updateSchoolItemsQuery = "UPDATE school_items 
                    INNER JOIN log_book ON school_items.qr_serial = log_book.qr_serial
                    SET school_items.item_status = 'Disposed', school_items.disposed_at = '$current_time', school_items.reason_for_disposal = '$dispo_reason', school_items.location = (SELECT location FROM stock_items WHERE stock_items.item_name = '$item_name')
                    WHERE log_book.log_id = '$log_id'";

                $updateSchoolItemsResult = mysqli_query($conn, $updateSchoolItemsQuery);

                if ($updateSchoolItemsResult) {
                    $response['success'] = true;
                    $response['message'] = '.';
                    echo '<script>alert("Status updated successfully"); window.location.href = "../../log-book.html";</script>';
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
        echo '<script>alert("Error updating log_book"); window.location.href = "../../log-book.html";</script>';
    }
} else {
    // Handle non-POST requests
    $response['message'] = 'Invalid request method';
    echo '<script>alert("Invalid request method"); window.location.href = "../../log-book.html";</script>';
}

// Output only the JSON response
echo json_encode($response);
?>