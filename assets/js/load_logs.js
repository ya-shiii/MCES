$(document).ready(function () {
    // Fetch log data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_logs.php", true);

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
            { data: 'num_items', title: 'Number of Items' },
            { data: 'user_id', title: 'Borrower ID' },
            { data: 'action_type', title: 'Action Type' },
            { data: 'log_date', title: 'Log Date' },
            {
                // Custom column for actions
                data: null,
                title: 'Action',
                render: function (data, type, row) {
                    // Check if status is 'pending'
                    if (row.status === 'pending') {
                        var verifyButton = '<button class="bg-green-500 w-20 text-white rounded px-2 py-1 m-2" onclick="verifyLog(' + row.log_id + ')">Verify</button>';
                        return verifyButton;
                    } else {
                        return ''; // No button for other statuses
                    }
                }
            }
        ]
    });
}

function verifyLog(logId) {
    // Perform AJAX request to verify-log.php
    $.ajax({
        type: 'POST',
        url: 'assets/php/verify-log.php',
        data: { log_id: logId },
        success: function (response) {
            console.log(response);
            alert('Log has been verified.');
            // Reload the entire page after verification
            location.reload();
        },
        error: function (error) {
            console.error('Error verifying log:', error);
        }
    });
}


