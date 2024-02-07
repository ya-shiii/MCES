<?php
// Include the database connection
include 'db_connect.php';

// Check if form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $departmentName = $_POST['departmentName'];
    $departmentDescription = $_POST['departmentDescription'];

    // Check if the department name already exists
    $checkSql = "SELECT * FROM department WHERE name = '$departmentName'";
    $checkResult = mysqli_query($conn, $checkSql);

    if (mysqli_num_rows($checkResult) > 0) {
        // Department name already exists, perform update
        $updateSql = "UPDATE department SET description = '$departmentDescription' WHERE name = '$departmentName'";

        if (mysqli_query($conn, $updateSql)) {
            // Department updated successfully
            echo "Department updated successfully";
            echo '<script>alert("Group updated successfully"); window.location.href = "../../user-management.html";</script>';
        } else {
            // Error updating department
            echo "Error: " . $updateSql . "<br>" . mysqli_error($conn);
            echo '<script>alert("Group updated successfully"); window.location.href = "../../user-management.html";</script>';
        }
    } else {
        // Department name does not exist, insert new department
        $insertSql = "INSERT INTO department (name, description) VALUES ('$departmentName', '$departmentDescription')";
        

        if (mysqli_query($conn, $insertSql)) {
            // New department added successfully
            echo "New department added successfully";
            echo '<script>alert("Group updated successfully"); window.location.href = "../../user-management.html";</script>';
        } else {
            // Error adding department
            echo "Error: " . $insertSql . "<br>" . mysqli_error($conn);
            echo '<script>alert("Group updated successfully"); window.location.href = "../../user-management.html";</script>';
        }
    }

    // Close database connection
    mysqli_close($conn);
}
?>
