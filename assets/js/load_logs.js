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
                    //console.log('JSON response from fetch_logs.php:', logData);

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
            { data: 'item_name', title: 'Item Name' },
            { data: 'item_type', title: 'Item Type' },
            { data: 'item_count', title: 'Number of Items' },
            { data: 'borrower_name', title: 'Request by' },
            { data: 'action', title: 'Request Type' },
            { data: 'location', title: 'Item Location' },
            { data: 'date_requested', title: 'Date Requested' },
            { data: 'date_approved', title: 'Date Approved' },
            {
                // Custom column for actions
                data: null,
                title: 'Action',
                render: function (data, type, row) {
                    // Check if status is 'pending'
                    if (row.status === 'pending') {
                        var verifyButton = '<button class="bg-green-500 w-20 text-white rounded px-2 py-1 m-2" onclick="verifyLog(' + row.log_id + ')">Approve</button>';
                        return verifyButton;
                    } else if (row.status === 'approved') {
                        if (row.action === 'borrow') {
                            var Confirmbtn = '<button class="bg-blue-500 w-20 text-white rounded px-2 py-1 m-2" onclick="scanQR(' + row.log_id + ')">Scan QR</button>';
                            return Confirmbtn;
                        }
                    } else {
                        return 'Completed';
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
                    //console.log('JSON response from fetch_logs.php:', logData);

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
                    //console.log('JSON response from fetch_logs.php:', logData);

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
            //console.log(response);
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

// Attach an event listener to the form submission
$('#borrowForm').submit(function(event) {
    // Prevent the default form submission
    event.preventDefault();
    // Call the function to send QR code data
});

function cancelSearchQR() {
    // Hide the addUser modal
    document.getElementById('scanItemsModal').classList.add('hidden');
}

// Function to start Instascan QR code scanning
function startInstascan(callback) {
    // Create a new Instascan scanner instance
    let scanner = new Instascan.Scanner({ video: document.createElement('video') });

    // Get the video container element
    let videoContainer = document.getElementById('scannerVideoContainer');

    // Add the video element to the container
    videoContainer.appendChild(scanner.video);

    // Add event listener for when a QR code is scanned
    scanner.addListener('scan', function (content) {
        // Handle the scanned QR code content
        console.log('Scanned QR code:', content);

        // Call the callback function with the scanned QR code value
        callback(content);

        // Stop the scanner
        scanner.stop();
    });

    // Start the scanner
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]); // Use the first available camera
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (error) {
        console.error('Error accessing cameras:', error);
    });
}

// Function to initiate QR code scanning
function scanQR(logId) {
    // Fetch the row from the request_log table using AJAX
    $.ajax({
        type: 'GET',
        url: 'assets/php/get_request_log.php',
        data: { log_id: logId },
        success: function (response) {
            // Parse the response JSON
            let data = JSON.parse(response);

            // Populate borrower name, ID, item count, and item location
            let borrowerName = data.borrower_name;
            let borrowerId = data.borrower_id;
            let itemLocation = data.location;

            // Update form fields
            $('#log_id').val(logId);
            $('#borrower_name').val(borrowerName);
            $('#borrower_id').val(borrowerId);
            $('#location').val(itemLocation);
            $('#return_date').val(""); // Clear the return date field

            // Show the scanItems modal
            $('#scanItemsModal').removeClass('hidden');

            // Start Instascan QR code scanning and pass a callback function
            startInstascan(function (scannedQR) {
                // Handle the scanned QR code value
                borrowItem(scannedQR);
            });
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error('Error fetching request log:', error);
        }
    });
}

//Function to open borrow item modal and fill the form fields
function borrowItem(scannedQR) {
    $.ajax({
        type: 'POST',
        url: 'assets/php/fetch-QRborrow.php', // Adjust the URL to the endpoint that fetches item details
        data: { scannedQR: scannedQR },
        dataType: 'json',
        success: function (response) {
            // Populate the form fields with the retrieved item details
            $('#qr_serial').val(scannedQR);
            $('#Item_name').val(response.item_name);
            $('#item_type').val(response.type);
            $('#mode_of_procurement').val(response.mode_of_procurement);
            $('#edit_warranty_expiration').val(response.warranty_expiry_date);
            $('#edit_serial_number').val(response.serial_number);
            $('#edit_manufacturer').val(response.manufacturer);
            $('#edit_lifespan').val(response.lifespan);

            // Show the borrow item modal
            $('#scanItemsModal').addClass('hidden');
            $('#borrowItemsModal').removeClass('hidden');
        },
        error: function (error) {
            console.error('Error fetching item details:', error);
            // Display error message to the user
            alert('Error fetching item details. Please try again.');
        }
    });
}

// Ensure that the DOM is fully loaded before executing jQuery code
$(document).ready(function () {
    // Your other jQuery code here...
});



function cancelBorrowItem() {
    // Hide the addUser modal
    document.getElementById('borrowItemsModal').classList.add('hidden');
}