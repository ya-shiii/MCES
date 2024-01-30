$(document).ready(function () {
    // Fetch user data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_users.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var userData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_users.php:', userData);

                    // Display the user table using DataTable
                    displayUserTable(userData);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            } else {
                console.error('Error fetching data. Status:', xhr.status);
            }
        }
    };

    xhr.send();
});

function displayUserTable(userData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'userDataTable');

    // Append the table to the container
    $('#userTable').empty().append(table);

    // Initialize DataTable
    $('#userDataTable').DataTable({
        data: userData,
        columns: [
            { data: 'user_id', title: 'User ID' },
            { data: 'username', title: 'Username' },
            { data: 'first_name', title: 'First Name' },
            { data: 'last_name', title: 'Last Name' },
            { data: 'email', title: 'Email' },
            { data: 'department', title: 'Department' },
            { data: 'verified', title: 'Verified' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    var verifyButton = '<button class="bg-green-500 w-20 text-white rounded px-2 py-1 m2" onclick="verifyUser(' + row.user_id + ')">Verify</button>';
                    var editButton = '<button class="bg-blue-500 w-20 text-white rounded px-2 py-1 m2" onclick="editUser(' + row.user_id + ')">Edit</button>';
                    var deleteButton = '<button class="bg-red-500 w-20 text-white rounded px-2 py-1 m-2" onclick="deleteUser(' + row.user_id + ')">Delete</button>';

                    // Conditions based on user verification
                    if (row.verified === 'no') {
                        return verifyButton + deleteButton;
                    } else {
                        return editButton + deleteButton;
                    }
                }
            }
        ]
    });
}

function verifyUser(userId) {
    // Confirm verification
    if (confirm('Are you sure you want to verify this user?')) {
        // Perform AJAX request to verify_user.php
        $.ajax({
            type: 'POST',
            url: 'assets/php/verify_user.php',
            data: { user_id: userId },
            success: function (response) {
                console.log(response);

                // Handle success (optional)
                alert('User verified successfully');

                // Reload the user data (if needed)
                location.reload();
            },
            error: function (error) {
                console.error('Error verifying user:', error);

                // Handle error (optional)
                alert('Error verifying user');
            }
        });
    }
}

function addUser() {
    // Show the addUser modal
    document.getElementById('addUserModal').classList.remove('hidden');

    // You may also want to reset the form fields here
    document.getElementById('addUsername').value = '';
    document.getElementById('addFirst_name').value = '';
    document.getElementById('addLast_name').value = '';
    document.getElementById('addEmail').value = '';
    document.getElementById('addPassword').value = '';
    document.getElementById('addDepartment').value = '';
}

// Function to cancel adding a user
function canceladdUser() {
    // Hide the addUser modal
    document.getElementById('addUserModal').classList.add('hidden');
}

function editUser(userId) {
    // AJAX request to fetch user data
    $.ajax({
        type: 'POST',
        url: 'assets/php/fetch_user-edit.php',
        data: { user_id: userId },
        success: function (userData) {
            console.log('Editing user:', userData.user_id);
            // Populate the modal form with user data
            document.getElementById('userId').value = userData.user_id;
            document.getElementById('editUsername').value = userData.username;
            document.getElementById('editFirst_name').value = userData.first_name;
            document.getElementById('editLast_name').value = userData.last_name;
            document.getElementById('editEmail').value = userData.email;
            document.getElementById('editPassword').value = userData.password;
            document.getElementById('editDepartment').value = userData.department;

            // Show the modal
            document.getElementById('editUserModal').classList.remove('hidden');
        },
        error: function (error) {
            console.error('Error fetching user data:', error);
        }
    });
}

function cancelEditUser() {
    // Hide the modal
    document.getElementById('editUserModal').classList.add('hidden');
}

function deleteUser(userId) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this user?')) {
        // Perform AJAX request to delete_user.php
        $.ajax({
            type: 'POST',
            url: 'assets/php/delete_user.php',
            data: { user_id: userId },
            success: function (response) {
                console.log('Success Response:', response);
                // Reload the page after deletion
                location.reload();
            },
            error: function (error) {
                console.error('Error Response:', error);
            }
        });
    }
}


