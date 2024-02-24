<?php
// Include the database connection
include 'db_connect.php';

// Check if form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $assetTypeName = $_POST['assetTypeName'];
    $assetTypeDescription = $_POST['assetTypeDescription'];
    $current_time = date('Y-m-d H:i:s'); // Get the current timestamp

    // Check if the asset type name already exists
    $checkSql = "SELECT * FROM `asset_type` WHERE name = '$assetTypeName'";
    $checkResult = mysqli_query($conn, $checkSql);

    if (mysqli_num_rows($checkResult) > 0) {
        // asset type name already exists, perform update
        $updateSql = "UPDATE `asset_type` SET description = '$assetTypeDescription', updated_at = '$current_time' WHERE name = '$assetTypeName'";

        if (mysqli_query($conn, $updateSql)) {
            // asset type updated successfully
            echo "Asset type updated successfully";
            echo '<script>alert("Asset type updated successfully"); window.location.href = "../../tracking.html";</script>';
        } else {
            // Error updating asset type
            echo "Error: " . $updateSql . "<br>" . mysqli_error($conn);
            echo '<script>alert("Error: "' . $updateSql . "<br>" . mysqli_error($conn).'"); window.location.href = "../../tracking.html";</script>';
        }
    } else {
        // asset type name does not exist, insert new asset type
        $insertSql = "INSERT INTO `asset_type` (name, description, created_at) VALUES ('$assetTypeName', '$assetTypeDescription' , '$current_time')";

        if (mysqli_query($conn, $insertSql)) {
            // New asset type added successfully
            echo "New asset type added successfully";
            echo '<script>alert("New asset type added successfully"); window.location.href = "../../tracking.html";</script>';
        } else {
            // Error adding asset type
            echo "Error: " . $insertSql . "<br>" . mysqli_error($conn);
            echo '<script>alert("Error: "' . $insertSql . "<br>" . mysqli_error($conn).'); window.location.href = "../../tracking.html";</script>';
        }
    }

    // Close database connection
    mysqli_close($conn);
}
?>
