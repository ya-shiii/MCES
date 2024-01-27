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
            { data: 'log_id', title: 'Log ID' },
            { data: 'serial_code', title: 'Serial Code' },
            { data: 'action_type', title: 'Action Type' },
            { data: 'log_date', title: 'Log Date' }
        ]
    });
}
