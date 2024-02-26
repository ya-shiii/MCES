$(document).ready(function () {
    // Fetch log data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_teacher_logs.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var logData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_logs.php:', logData);

                    // Display the logs table using DataTable
                    displayLogsTable(logData);
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

function displayLogsTable(logData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'logsDataTable');

    // Append the table to the container
    $('#logsTable').empty().append(table);

    // Initialize DataTable
    $('#logsDataTable').DataTable({
        data: logData,
        columns: [
            { data: 'qr_serial', title: 'Item QR Serial' },
            { data: 'item_name', title: 'Item Name' },
            { data: 'action_type', title: 'Action Type' },
            { data: 'log_date', title: 'Log Date' },
            { data: 'due_date', title: 'Return Due' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    if (row.action_type === 'borrow') {
                        if (row.status === 'pending') {
                            return 'Pending Approval';
                        } else if (row.status === 'approved') {
                            // Display return button for approved borrow
                            return '<button class="bg-green-500 w-20 text-white rounded px-2 py-1 m-2" onclick="returnItem(\'' + row.log_id + '\')">Return</button>';
                        }
                    } else if (row.action_type === 'return') {
                        if (row.status === 'pending') {
                            return 'Pending Confirmation';
                        } else if (row.status === 'completed') {
                            return 'Completed';
                        }
                    }

                    // Default case (should not happen)
                    return '';
                }
            }
        ],
        // Set the default order for the 'log_date' column in descending order
        order: [[4, 'desc']]
    });
}


function returnItem(logId) {
    // Confirm with the user before proceeding with the return
    var confirmReturn = confirm('Are you sure you want to return this item?');

    if (confirmReturn) {
        // AJAX request to handle the return process
        $.ajax({
            type: 'POST',
            url: 'assets/php/return.php',
            data: { log_id: logId },
            success: function (response) {
                console.log('Return successful:', response);

                alert('Returned Item. Please wait for admin confirmation.'); 
                window.location.href='logs.html';
            },
            error: function (error) {
                console.error('Error returning item:', error);
                alert('Error returning item:', error); 
                window.location.href='logs.html';
                // Handle the error or provide feedback to the user
            }
        });
    }
}



fetch('assets/php/fetch_user_data.php')
                .then(response => response.json())
                .then(data => {
                    //for debugging
                    //console.log('User ID:', data.user_id);
                    //console.log('Last Name:', data.last_name);

                    // Display the last name in the session in the span with id 'teacher-name'
                    document.getElementById('teacher-name').textContent = data.full_name;
                })
                .catch(error => console.error('Error fetching user data:', error));


function showAll(){
    window.location.href='logs-all.html';
}
