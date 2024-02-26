// display pending logs
$(document).ready(function () {
    showPending();
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
                    displayPendingTable(logData);
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

function displayPendingTable(logData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'pendingDataTable');

    // Append the table to the container
    $('#pendingTable').empty().append(table);

    // Initialize DataTable
    $('#pendingDataTable').DataTable({
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
                title: 'Action',
                render: function (data, type, row) {
                    // Check if status is 'pending'
                    if (row.status === 'pending') {
                        var verifyButton = '<button class="bg-green-500 w-20 text-white rounded px-2 py-1 m-2" onclick="verifyLog(' + row.log_id + ')">Verify</button>';
                        return verifyButton;
                    } else {
                        if (row.action_type === 'borrow') {
                            return 'Approved';
                        } else {
                            return 'Completed';
                        }


                    }
                }
            }
        ],
        order: [[5, 'desc']]
    });
}

// display borrowed logs
$(document).ready(function () {
    // Fetch log data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_b-logs.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var logData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_logs.php:', logData);

                    // Display the logs table using DataTable
                    displayBorrowedTable(logData);
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

function displayBorrowedTable(logData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'borrowDataTable');

    // Append the table to the container
    $('#borrowTable').empty().append(table);

    // Initialize DataTable
    $('#borrowDataTable').DataTable({
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
                title: 'Status',
                render: function (data, type, row) {
                    return 'Approved';
                }
            }
        ],
        order: [[5, 'desc']]
    });
}

// display completed logs
$(document).ready(function () {
    // Fetch log data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_c-logs.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var logData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_logs.php:', logData);

                    // Display the logs table using DataTable
                    displayCompletedTable(logData);
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

function displayCompletedTable(logData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'completeDataTable');

    // Append the table to the container
    $('#completeTable').empty().append(table);

    // Initialize DataTable
    $('#completeDataTable').DataTable({
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
                title: 'Status',
                render: function (data, type, row) {
                    // Check if status is 'pending'

                    return 'Completed';
                }
            }
        ],
        order: [[5, 'desc']]
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

// interactive buttons
function showPending() {
    // Show the pending table
    document.getElementById('pendingTable').classList.remove('hidden');
    document.getElementById('borrowTable').classList.add('hidden');
    document.getElementById('completeTable').classList.add('hidden');
    document.getElementById('pendingTablediv').classList.add('bg-blue-900');
    document.getElementById('pendingTablebtn').classList.add('bg-blue-900');
    document.getElementById('pendingTablediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('pendingTablebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('borrowTablediv').classList.remove('bg-blue-900');
    document.getElementById('borrowTablebtn').classList.remove('bg-blue-900');
    document.getElementById('borrowTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('borrowTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('completeTablediv').classList.remove('bg-blue-900');
    document.getElementById('completeTablebtn').classList.remove('bg-blue-900');
    document.getElementById('completeTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('completeTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
}
function showBorrowed() {
    // Show the pending table
    document.getElementById('pendingTable').classList.add('hidden');
    document.getElementById('borrowTable').classList.remove('hidden');
    document.getElementById('completeTable').classList.add('hidden');
    document.getElementById('pendingTablediv').classList.remove('bg-blue-900');
    document.getElementById('pendingTablebtn').classList.remove('bg-blue-900');
    document.getElementById('pendingTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('pendingTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('borrowTablediv').classList.add('bg-blue-900');
    document.getElementById('borrowTablebtn').classList.add('bg-blue-900');
    document.getElementById('borrowTablediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('borrowTablebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('completeTablediv').classList.remove('bg-blue-900');
    document.getElementById('completeTablebtn').classList.remove('bg-blue-900');
    document.getElementById('completeTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('completeTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
}
function showComplete() {
    // Show the pending table
    document.getElementById('pendingTable').classList.add('hidden');
    document.getElementById('borrowTable').classList.add('hidden');
    document.getElementById('completeTable').classList.remove('hidden');
    document.getElementById('pendingTablediv').classList.remove('bg-blue-900');
    document.getElementById('pendingTablebtn').classList.remove('bg-blue-900');
    document.getElementById('pendingTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('pendingTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('borrowTablediv').classList.remove('bg-blue-900');
    document.getElementById('borrowTablebtn').classList.remove('bg-blue-900');
    document.getElementById('borrowTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('borrowTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('completeTablediv').classList.add('bg-blue-900');
    document.getElementById('completeTablebtn').classList.add('bg-blue-900');
    document.getElementById('completeTablediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('completeTablebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
}

