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
            let log_id = logId;
            let item_name = data.item_name;
            let item_type = data.item_type;
            let borrowerName = data.borrower_name;
            let borrowerId = data.borrower_id;
            let itemCount = data.item_count;
            let itemLocation = data.location;

            // Populate the form with the fetched data
            $('#log_id').val(log_id);
            $('#item_name').val(item_name);
            $('#item_type').val(item_type);
            $('#borrowerName').val(borrowerName);
            $('#borrowerId').val(borrowerId);
            $('#item_location').val(itemLocation);

            // Clear previous input elements
            $('#inputContainer').empty();

            // Dynamically generate input elements based on the number of items
            for (let i = 1; i <= itemCount; i++) {
                // Create a new input element for uploading QR code images
                let input = $('<input/>', {
                    type: 'file',
                    id: 'imageInput' + i,
                    name: 'imageInput' + i,
                    accept: 'image/*',
                    class: 'w-full border border-gray-300 py-2 px-5 rounded-lg mb-1 mt-4',
                    required: true
                });

                // Create a new div for displaying the QR status
                let qrStatus = $('<div/>', {
                    id: 'qrStatus' + i,
                    class: 'text-sm font-bold hidden'
                });

                // Create a new div for displaying the QR code
                let qrCodeDisplay = $('<div/>', {
                    id: 'qrCode' + i,
                    class: 'text-xs font-bold hidden'
                });

                // Append the input element, QR status div, and QR code div to the container
                $('#inputContainer').append(input, qrStatus, qrCodeDisplay);
            }

            // Show the scanItems modal
            $('#scanItemsModal').removeClass('hidden');

            // Call scanForQR function to start scanning for QR codes
            scanForQR();
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error('Error fetching request log:', error);
        }
    });
}



function scanForQR() {
    // Iterate over each input field
    $('[id^="imageInput"]').each(function (index) {
        let inputFile = this;
        let qrStatus = document.getElementById('qrStatus' + (index + 1));
        let qrCodeDisplay = document.getElementById('qrCode' + (index + 1));
        let sendButton = document.getElementById('sendButton');

        // Add event listener for each input field
        inputFile.addEventListener('change', function () {
            // Check if a file has been selected
            if (inputFile.files.length > 0) {
                let file = inputFile.files[0];
                let reader = new FileReader();

                // Read the contents of the file
                reader.onload = function (e) {
                    let img = new Image();
                    img.onload = function () {
                        // Create a canvas element to work with jsQR
                        let canvas = document.createElement('canvas');
                        let context = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);

                        // Get the image data from the canvas
                        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

                        // Use jsQR to decode the QR code from the image
                        let code = jsQR(imageData.data, imageData.width, imageData.height);
                        if (code) {
                            qrStatus.textContent = 'QR Code Found';
                            qrStatus.classList.remove('text-red-500', 'text-yellow-500');
                            qrStatus.classList.add('text-green-500');

                            // Display the QR code
                            qrCodeDisplay.textContent = 'QR Code: ' + code.data;
                            qrCodeDisplay.classList.remove('hidden');
                            // Enable the send button
                            sendButton.disabled = false;
                        } else {
                            // No QR code found
                            qrStatus.textContent = 'NO QR FOUND';
                            qrStatus.classList.remove('text-green-500', 'text-yellow-500');
                            qrStatus.classList.add('text-red-500');

                            // Hide the QR code display
                            qrCodeDisplay.textContent = '';
                            qrCodeDisplay.classList.add('hidden');

                            // Disable the send button
                            sendButton.disabled = true;
                        }
                        qrStatus.classList.remove('hidden');
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                // No file selected
                qrStatus.textContent = 'NO QR FOUND';
                qrStatus.classList.remove('text-green-500', 'text-yellow-500');
                qrStatus.classList.add('text-red-500');

                // Hide the QR code display
                qrCodeDisplay.textContent = '';
                qrCodeDisplay.classList.add('hidden');

                // Disable the send button
                sendButton.disabled = true;

                qrStatus.classList.remove('hidden');
            }
        });
    });
}

// Function to send QR code data to a PHP file
function sendQRCodeData() {
    // Get the return date value
    let returnDate = $('#return_date').val();
    // Check if the return date is filled up
    if (returnDate === "") {
        // Display an alert or error message indicating that the return date is required
        alert('Please select a return date.');
        return; // Exit the function early if the return date is not filled up
    }

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the request parameters
    var url = 'assets/php/borrow_items_qr.php';
    var method = 'POST';
    var jsonData = JSON.stringify({
        log_id: $('#log_id').val(),
        qr_data: qrCodeData,
        item_name: $('#item_name').val(),
        item_type: $('#item_type').val(),
        return_date: returnDate,
        borrower_name: $('#borrowerName').val(),
        borrower_id: $('#borrowerId').val(),
        location: $('#item_location').val()
    });

    // Log the JSON data to console
    console.log('Data to be sent:', jsonData);

    // Configure the request
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up event listeners
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Success
            var response = JSON.parse(xhr.responseText);
            console.log('Data sent successfully');
            if (response.success) {
                console.log('Success:', response.message);
            } else {
                console.error('Error:', response.error);
            }
        } else {
            // Error
            console.error('Error sending data:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        // Network error
        console.error('Network error occurred');
    };

    // Send the request with the JSON data
    xhr.send(jsonData);
}

// Attach an event listener to the form submission
$('#borrowForm').submit(function(event) {
    // Prevent the default form submission
    event.preventDefault();
    // Call the function to send QR code data
    sendQRCodeData();
});



function cancelSearchQR() {
    // Hide the addUser modal
    document.getElementById('scanItemsModal').classList.add('hidden');
}