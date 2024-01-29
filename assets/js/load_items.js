$(document).ready(function () {
    // Fetch item data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_items.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var itemData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_items.php:', itemData);

                    // Display the items table using DataTable
                    displayItemsTable(itemData);
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

function displayItemsTable(itemData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'itemsDataTable');

    // Append the table to the container
    $('#itemsTable').empty().append(table);

    // Initialize DataTable
    $('#itemsDataTable').DataTable({
        data: itemData,
        columns: [
            { data: 'serial_code', title: 'Item Serial' },
            { data: 'item_name', title: 'Item Name' },
            { data: 'total_items', title: 'Total Items' },
            { data: 'items_borrowed', title: 'Items Borrowed' },
            { data: 'borrowable_items', title: 'Borrowable' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    var editButton = '<button class="bg-blue-500 w-20 text-white rounded px-2 py-1 m-2" onclick="editItem(\'' + row.serial_code + '\')">Edit</button>';
                    var deleteButton = '<button class="bg-red-500 w-20 text-white rounded px-2 py-1 m-2" onclick="deleteItem(\'' + row.serial_code + '\')">Delete</button>';

                    return editButton + deleteButton;
                }
            }
        ]
    });
}

function addItemModal() {
    $('#addItemModal').removeClass('hidden');
}

// Function to hide the Add Item modal
function cancelAddItem() {
    $('#addItemModal').addClass('hidden');
}

// Function to handle item editing
function editItem(serialCode) {
    // AJAX request to fetch item data
    $.ajax({
        type: 'POST',
        url: 'assets/php/fetch_item-edit.php',
        data: { serial_code: serialCode },
        success: function (itemData) {
            console.log('Editing item:', itemData.serial_code);

            // Show the modal
            document.getElementById('editItemModal').classList.remove('hidden');

            // Get the container for QR code
            var qrcodeContainer = document.getElementById('editQrcode'); // Change the id here

            // Regenerate the QR code
            var qrcode = new QRCode(qrcodeContainer, {
                text: serialCode,
                width: 200,
                height: 200
            });

            // Set QR code data URL to the hidden input
            document.getElementById('qr_data_url').value = qrcodeContainer.getElementsByTagName('canvas')[0].toDataURL('image/png');

            // Populate the modal form with item data
            document.getElementById('oldSerial_code').value = itemData.serial_code;
            document.getElementById('editSerial_code').value = itemData.serial_code;
            document.getElementById('editItem_name').value = itemData.item_name;
            document.getElementById('editTotal_items').value = itemData.total_items;
            document.getElementById('borrowed_items').value = itemData.items_borrowed;
        },
        error: function (error) {
            console.error('Error fetching item data:', error);
        }
    });
}


// Function to cancel editing an item
function cancelEditItem() {
    // Hide the editItem modal
    document.getElementById('editItemModal').classList.add('hidden');
}

function deleteItem(serialCode) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this item?')) {
        // Perform AJAX request to delete_item.php
        $.ajax({
            type: 'POST',
            url: 'assets/php/delete_item.php',
            data: { serial_code: serialCode },
            dataType: 'json', // Specify JSON data type
            success: function (response) {
                console.log(response);

                // Reload the DataTable after deletion
                location.reload();
            },
            error: function (error) {
                console.error('Error deleting item:', error);
            }
        });
    }
}

document.getElementById('serial_code').addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});

document.getElementById('editSerial_code').addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});


// for generating and saving QR code
function generateQR() {
    // Clear existing QR code
    var qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';

    var serialCode = document.getElementById('serial_code').value;
    var qrcode = new QRCode(document.getElementById('qrcode'), {
        text: serialCode,
        width: 200,
        height: 200
    });

    // Set QR code data URL to the hidden input
    document.getElementById('qr_data_url').value = document.getElementById('qrcode').getElementsByTagName('canvas')[0].toDataURL('image/png');
}

function saveQR() {
    // Get the canvas element of the QR code
    var canvas = document.getElementById('qrcode').getElementsByTagName('canvas')[0];

    // Convert the canvas to a data URL
    var dataURL = canvas.toDataURL('image/png');

    // Create a link element
    var link = document.createElement('a');
    link.href = dataURL;

    // Set the download attribute with the desired filename
    link.download = 'assets/qr/' + document.getElementById('serial_code').value + '.png';

    // Append the link to the document and trigger a click to start the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}

// for generating and saving QR code
function generateNewQR() {
    // Clear existing QR code
    var qrcodeContainer1 = document.getElementById('editQrcode');
    qrcodeContainer1.innerHTML = '';

    var serialCode = document.getElementById('editSerial_code').value;
    var qrcode = new QRCode(document.getElementById('editQrcode'), {
        text: serialCode,
        width: 200,
        height: 200
    });

    // Set QR code data URL to the hidden input
    document.getElementById('edit_qr_data_url').value = document.getElementById('editQrcode').getElementsByTagName('canvas')[0].toDataURL('image/png');
}

function editQR() {
    // Get the canvas element of the QR code
    var canvas = document.getElementById('editQrcode').getElementsByTagName('canvas')[0];

    // Convert the canvas to a data URL
    var dataURL = canvas.toDataURL('image/png');

    // Create a link element
    var link = document.createElement('a');
    link.href = dataURL;

    // Set the download attribute with the desired filename
    link.download = 'assets/qr/' + document.getElementById('editSerial_code').value + '.png';

    // Append the link to the document and trigger a click to start the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}

