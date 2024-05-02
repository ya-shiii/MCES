<?php
// Include your database connection file here
include_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $logId = $_POST['log_id'];
    $borrowerName = $_POST['borrower_name'];
    $borrowerID = $_POST['borrower_id'];
    $location = $_POST['location'];
    $returnDate = $_POST['return_date'];
    $qrSerial = $_POST['qr_serial'];
    $itemName = $_POST['Item_name'];
    $itemType = $_POST['item_type'];
    $modeOfProcurement = $_POST['mode_of_procurement'];
    $warrantyExpiration = $_POST['edit_warranty_expiration'];
    $serialNumber = $_POST['edit_serial_number'];
    $manufacturer = $_POST['edit_manufacturer'];
    $lifespan = $_POST['edit_lifespan'];

    // Update request_log table to decrement item_count by 1
    $sqlUpdateRequestLog = "UPDATE request_log SET item_count = item_count - 1 WHERE log_id = $logId";
    mysqli_query($conn, $sqlUpdateRequestLog);

    // Check if item_count is zero
    $sqlCheckItemCount = "SELECT item_count FROM request_log WHERE log_id = $logId";
    $result = mysqli_query($conn, $sqlCheckItemCount);
    $row = mysqli_fetch_assoc($result);
    $itemCount = $row['item_count'];

    // If item_count is zero, delete the record
    if ($itemCount == 0) {
        $sqlDeleteRequestLog = "DELETE FROM request_log WHERE log_id = $logId";
        mysqli_query($conn, $sqlDeleteRequestLog);
    }

    // Insert record into log_book table
    $dueDate = date('Y-m-d', strtotime($returnDate));
    $sqlInsertLogBook = "INSERT INTO log_book (qr_serial, item_name, user_id, user_name, action_type, due_date, status)
                        VALUES ('$qrSerial', '$itemName', '$borrowerID', '$borrowerName', 'borrow', '$dueDate', 'approved')";
    mysqli_query($conn, $sqlInsertLogBook);

    // Update school_item table
    $sqlUpdateSchoolItem = "UPDATE school_item SET location = '$location', item_status = 'Borrowed' WHERE qr_serial = '$qrSerial'";
    mysqli_query($conn, $sqlUpdateSchoolItem);

    // Update stock_items table
    $sqlUpdateStockItems = "UPDATE stock_items SET available_items = available_items - 1, borrowed_items = borrowed_items + 1
                            WHERE item_name = '$itemName' AND item_type = '$itemType'";
    mysqli_query($conn, $sqlUpdateStockItems);

    // Close database connection
    mysqli_close($conn);

    // Return response to client-side JavaScript
    echo "<script>alert('Item borrowed successfully'); window.location.href = document.referrer;</script>";
} else {
    // If the form is not submitted, return an error message
    echo "Error: Form not submitted";
}
?>