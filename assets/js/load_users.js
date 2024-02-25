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
            { data: 'full_name', title: 'Full Name' },
            { data: 'email', title: 'Email' },
            { data: 'department', title: 'Department' },
            { data: 'u_role', title: 'Role' },
            { data: 'group', title: 'Group' },
            { data: 'contact_information', title: 'Contact Information' },
            { data: 'u_description', title: 'Description' },
            { data: 'created_on', title: 'Created On' },
            { data: 'updated_on', title: 'Updated On' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    var verifyButton = '<button class="bg-green-500 w-20 text-white rounded px-2 py-1 m2" onclick="verifyUser(' + row.user_id + ')">Verify</button>';
                    var editButton = '<button class="bg-blue-500 w-20 text-white rounded px-2 py-1 m2" onclick="editUser(' + row.user_id + ')">Edit</button>';
                    var deleteButton = '<button class="bg-red-500 w-20 text-white rounded px-2 py-1 m-2" onclick="deleteUser(' + row.user_id + ')">Delete</button>';

                    // Conditions based on user verification
                    if (row.verified !== '1') {
                        return verifyButton + deleteButton;
                    } else {
                        return editButton + deleteButton;
                    }
                }
            }
        ]
    });
}

// load dept table
$(document).ready(function () {
    // Fetch user data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_departments.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var deptData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_departments.php:', deptData);

                    // Display the user table using DataTable
                    displaydeptTable(deptData);
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

function displaydeptTable(deptData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'deptDataTable');

    // Append the table to the container
    $('#deptTable').empty().append(table);

    // Initialize DataTable
    $('#deptDataTable').DataTable({
        data: deptData,
        columns: [
            { data: 'name', title: 'Department' },
            { data: 'description', title: 'Description' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    var deleteButton = '<button class="bg-red-500 w-20 text-white rounded px-2 py-1 m-2" onclick="deleteDept(' + row.id + ')">Delete</button>';
                    return deleteButton;
                }
            }
        ]
    });
}

// load groups table
$(document).ready(function () {
    // Fetch user data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_groups.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var groupData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_groups.php:', groupData);

                    // Display the user table using DataTable
                    displaygroupTable(groupData);
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

function displaygroupTable(groupData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'groupDataTable');

    // Append the table to the container
    $('#groupTable').empty().append(table);

    // Initialize DataTable
    $('#groupDataTable').DataTable({
        data: groupData,
        columns: [
            { data: 'name', title: 'Group Name' },
            { data: 'description', title: 'Description' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    var deleteButton = '<button class="bg-red-500 w-20 text-white rounded px-2 py-1 m-2" onclick="deleteGroup(' + row.id + ')">Delete</button>';
                    return deleteButton;
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
function addOptions() {
    // Show the addUser modal
    document.getElementById('addOptionsModal').classList.remove('hidden');
}
function cancelOptions() {
    // Hide the addUser modal
    document.getElementById('addOptionsModal').classList.add('hidden');
}

// Function to show the Group form
function showGroupForm() {
    document.getElementById('groupForm').classList.remove('hidden');
}

// Function to hide the Group form
function cancelAddGroup() {
    document.getElementById('groupForm').classList.add('hidden');
    document.getElementById('addOptionsModal').classList.remove('hidden');
}

// Function to show the Department form
function showDepartmentForm() {
    document.getElementById('departmentForm').classList.remove('hidden');
}

// Function to hide the Department form
function cancelAddDepartment() {
    document.getElementById('departmentForm').classList.add('hidden');
    document.getElementById('addOptionsModal').classList.remove('hidden');
}


function showUserForm() {
    // Show the Add User modal
    document.getElementById('addOptionsModal').classList.add('hidden');
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
    document.getElementById('addOptionsModal').classList.remove('hidden');
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
            document.getElementById('editUserId').value = userData.user_id;
            document.getElementById('editUsername').value = userData.username;
            document.getElementById('editFullName').value = userData.full_name;
            document.getElementById('editEmail').value = userData.email;
            document.getElementById('editDepartment').value = userData.department;
            document.getElementById('editRole').value = userData.u_role;
            document.getElementById('editGroup').value = userData.group;
            document.getElementById('editContactInfo').value = userData.contact_information;
            document.getElementById('editDescription').value = userData.u_description;

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

function deleteDept(dept_id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this department?')) {
        // Perform AJAX request to delete_dept.php
        $.ajax({
            type: 'POST',
            url: 'assets/php/delete_dept.php',
            data: { id: dept_id },
            dataType: 'json', // Specify JSON data type
            success: function (response) {
                console.log(response);

                // Reload the DataTable after deletion
                location.reload();
            },
            error: function (error) {
                console.error('Error deleting department:', error);
            }
        });
    }
}

function deleteGroup(group_id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this group?')) {
        // Perform AJAX request to delete_dept.php
        $.ajax({
            type: 'POST',
            url: 'assets/php/delete_group.php',
            data: { id: group_id },
            dataType: 'json', // Specify JSON data type
            success: function (response) {
                console.log(response);

                // Reload the DataTable after deletion
                location.reload();
            },
            error: function (error) {
                console.error('Error deleting department:', error);
            }
        });
    }
}



// interactive buttons
function showUsers() {
    // Show the Disposed Asset table
    document.getElementById('userTable').classList.remove('hidden');
    document.getElementById('deptTable').classList.add('hidden');
    document.getElementById('groupTable').classList.add('hidden');
    document.getElementById('userTablediv').classList.add('bg-blue-900');
    document.getElementById('userTablebtn').classList.add('bg-blue-900');
    document.getElementById('userTablediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('userTablebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('deptTablediv').classList.remove('bg-blue-900');
    document.getElementById('deptTablebtn').classList.remove('bg-blue-900');
    document.getElementById('deptTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('deptTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('groupTablediv').classList.remove('bg-blue-900');
    document.getElementById('groupTablebtn').classList.remove('bg-blue-900');
    document.getElementById('groupTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('groupTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
}
function showDept() {
    // Show the Disposed Asset table
    document.getElementById('userTable').classList.add('hidden');
    document.getElementById('deptTable').classList.remove('hidden');
    document.getElementById('groupTable').classList.add('hidden');
    document.getElementById('userTablediv').classList.remove('bg-blue-900');
    document.getElementById('userTablebtn').classList.remove('bg-blue-900');
    document.getElementById('userTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('userTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('deptTablediv').classList.add('bg-blue-900');
    document.getElementById('deptTablebtn').classList.add('bg-blue-900');
    document.getElementById('deptTablediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('deptTablebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('groupTablediv').classList.remove('bg-blue-900');
    document.getElementById('groupTablebtn').classList.remove('bg-blue-900');
    document.getElementById('groupTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('groupTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
}
function showGroup() {
    // Show the Disposed Asset table
    document.getElementById('userTable').classList.add('hidden');
    document.getElementById('deptTable').classList.add('hidden');
    document.getElementById('groupTable').classList.remove('hidden');
    document.getElementById('userTablediv').classList.remove('bg-blue-900');
    document.getElementById('userTablebtn').classList.remove('bg-blue-900');
    document.getElementById('userTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('userTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('deptTablediv').classList.remove('bg-blue-900');
    document.getElementById('deptTablebtn').classList.remove('bg-blue-900');
    document.getElementById('deptTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('deptTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('groupTablediv').classList.add('bg-blue-900');
    document.getElementById('groupTablebtn').classList.add('bg-blue-900');
    document.getElementById('groupTablediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('groupTablebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
}