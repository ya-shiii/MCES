$(document).ready(function () {
    // Fetch log data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_allLogs.php", true);

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
            { data: 'log_id', title: 'Log ID' },
            { data: 'serial_code', title: 'Serial Code' },
            { data: 'action_type', title: 'Action Type' },
            { data: 'num_items', title: 'No. of Items' },
            { data: 'log_date', title: 'Log Date' },
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
                            return 'To Return';
                        }
                    } else if (row.action_type === 'return') {
                        if (row.status === 'pending') {
                            return 'Pending Approval';
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

function returnLogs(){
    window.location.href='logs.html';
}


fetch('assets/php/fetch_user_data.php')
                .then(response => response.json())
                .then(data => {
                    //for debugging
                    //console.log('User ID:', data.user_id);
                    //console.log('Last Name:', data.last_name);

                    // Display the last name in the session in the span with id 'teacher-name'
                    document.getElementById('teacher-name').textContent = data.last_name;
                })
                .catch(error => console.error('Error fetching user data:', error));



