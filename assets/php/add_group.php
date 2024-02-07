<?php
// Include the database connection
include 'db_connect.php';

// Check if form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $groupName = $_POST['groupName'];
    $groupDescription = $_POST['groupDescription'];

    // Check if the group name already exists
    $checkSql = "SELECT * FROM `group` WHERE name = '$groupName'";
    $checkResult = mysqli_query($conn, $checkSql);

    if (mysqli_num_rows($checkResult) > 0) {
        // Group name already exists, perform update
        $updateSql = "UPDATE `group` SET description = '$groupDescription' WHERE name = '$groupName'";

        if (mysqli_query($conn, $updateSql)) {
            // Group updated successfully
            echo "Group updated successfully";
            echo '<script>alert("Group updated successfully"); window.location.href = "../../user-management.html";</script>';
        } else {
            // Error updating group
            echo "Error: " . $updateSql . "<br>" . mysqli_error($conn);
            echo '<script>alert("Error: "' . $updateSql . "<br>" . mysqli_error($conn).'"); window.location.href = "../../user-management.html";</script>';
        }
    } else {
        // Group name does not exist, insert new group
        $insertSql = "INSERT INTO `group` (name, description) VALUES ('$groupName', '$groupDescription')";

        if (mysqli_query($conn, $insertSql)) {
            // New group added successfully
            echo "New group added successfully";
            echo '<script>alert("New group added successfully"); window.location.href = "../../user-management.html";</script>';
        } else {
            // Error adding group
            echo "Error: " . $insertSql . "<br>" . mysqli_error($conn);
            echo '<script>alert("Error: "' . $insertSql . "<br>" . mysqli_error($conn).'); window.location.href = "../../user-management.html";</script>';
        }
    }

    // Close database connection
    mysqli_close($conn);
}
?>
