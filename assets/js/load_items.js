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

// Load type dropdown in add
$(document).ready(function () {
    $.ajax({
        url: 'assets/php/fetch_asset_types.php',
        method: 'GET',
        dataType: 'json', // Specify that the expected response is JSON
        success: function (data) {
            var assetTypes = data; // No need to parse JSON manually
            var $typeDropdown = $('#type');
            $typeDropdown.empty().append($('<option>').text('Select Asset Type').val(''));
            $.each(assetTypes, function (index, assetType) {
                $typeDropdown.append($('<option>').text(assetType.name).val(assetType.name));
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching asset types:', error);
            // Handle error case if needed
        }
    });
});

// Load type dropdown in edit
$(document).ready(function () {
    // Fetch item types via AJAX
    $.ajax({
        url: 'assets/php/fetch_asset_types.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var itemTypes = data;
            var $itemTypeDropdown = $('#edit_item_type');
            $itemTypeDropdown.empty().append($('<option>').text('Select Item Type').val(''));
            $.each(itemTypes, function (index, itemType) {
                $itemTypeDropdown.append($('<option>').text(itemType.name).val(itemType.id));
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching item types:', error);
            // Handle error case if needed
        }
    });
});

$(document).ready(function () {
    $.ajax({
        url: 'assets/php/fetch_asset_types.php',
        method: 'GET',
        dataType: 'json', // Specify that the expected response is JSON
        success: function (data) {
            var assetTypes = data; // No need to parse JSON manually
            var $typeDropdown = $('#type');
            $typeDropdown.empty().append($('<option>').text('Select Asset Type').val(''));
            $.each(assetTypes, function (index, assetType) {
                $typeDropdown.append($('<option>').text(assetType.name).val(assetType.name));
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching asset types:', error);
            // Handle error case if needed
        }
    });
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
            { data: 'qr_serial', title: 'QR Serial' },
            { data: 'item_name', title: 'Item Name' },
            { data: 'type', title: 'Item Type' },
            { data: 'mode_of_procurement', title: 'Mode of Procurement' },
            { data: 'warranty_expiry_date', title: 'Warranty Expiration' },
            { data: 'serial_number', title: 'Serial Number' },
            { data: 'manufacturer', title: 'Manufacturer' },
            { data: 'lifespan', title: 'Lifespance (Yrs)' },
            { data: 'location', title: 'Current Location' },
            { data: 'acquired_at', title: 'Date Acquired' },
            { data: 'edited_at', title: 'Date Edited' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    var editButton = '<button class="bg-blue-500 w-20 text-white rounded px-2 py-1 m-2" onclick="editItem(\'' + row.qr_serial + '\')">Edit</button>';
                    var deleteButton = '<button class="bg-red-500 w-20 text-white rounded px-2 py-1 m-2" onclick="deleteItem(\'' + row.qr_serial + '\')">Delete</button>';

                    return editButton + deleteButton;
                }
            }
        ]
    });
}

$(document).ready(function () {
    // Fetch item data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_assets.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var itemData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_assets.php:', itemData);

                    // Display the items table using DataTable
                    displayAssetsTable(itemData);
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
function displayAssetsTable(itemData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'assetsDataTable');

    // Append the table to the container
    $('#assetTable').empty().append(table);

    // Initialize DataTable
    $('#assetsDataTable').DataTable({
        data: itemData,
        columns: [
            { data: 'name', title: 'Asset Name' },
            { data: 'type', title: 'Asset Type' },
            { data: 'mode_of_procurement', title: 'Mode of Procurement' },
            { data: 'number_of_items', title: 'No. of Items' },
            { data: 'price_per_item', title: 'Price per Item' },
            { data: 'total_price', title: 'Total Price' },
            { data: 'location', title: 'Location' },
            { data: 'acquired_at', title: 'Date Acquired' },

        ]
    });
}

$(document).ready(function () {
    // Fetch item data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_assetTypes.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var itemData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_assetTypes.php:', itemData);

                    // Display the items table using DataTable
                    displayTypes(itemData);
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
function displayTypes(itemData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'assetsTypesTable');

    // Append the table to the container
    $('#assetTypes').empty().append(table);

    // Initialize DataTable
    $('#assetsTypesTable').DataTable({
        data: itemData,
        columns: [
            { data: 'name', title: 'Asset Name' },
            { data: 'description', title: 'Asset Description' },
            { data: 'created_at', title: 'Date Created' },
            { data: 'updated_at', title: 'Date Updated' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    var deleteButton = '<button class="bg-red-500 w-20 text-white rounded px-2 py-1 m-2" onclick="deleteAssetType(\'' + row.id + '\')">Delete</button>';

                    return deleteButton;
                }
            }
        ]
    });
}

$(document).ready(function () {
    // Fetch item data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_disposed.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var itemData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_disposed.php:', itemData);

                    // Display the items table using DataTable
                    displayDisposedTable(itemData);
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

function displayDisposedTable(itemData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'disposedAssetsTable');

    // Append the table to the container
    $('#disposedAssets').empty().append(table);

    // Initialize DataTable
    $('#disposedAssetsTable').DataTable({
        data: itemData,
        columns: [
            { data: 'item_name', title: 'Asset Name' },
            { data: 'type', title: 'Asset Type' },
            { data: 'description', title: 'Description' },
            { data: 'serial_number', title: 'Serial Number' },
            { data: 'manufacturer', title: 'Manufacturer' },
            { data: 'reason_for_disposal', title: 'Reason for Disposal' },
            { data: 'disposed_at', title: 'Date Disposed' },

        ]
    });
}

function showAssetTable() {
    // show the items table
    document.getElementById('assetTypes').classList.add('hidden');
    document.getElementById('assetTable').classList.add('hidden');
    document.getElementById('itemsTable').classList.remove('hidden');
    document.getElementById('disposedAssets').classList.add('hidden');
    document.getElementById('assetTablediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTablebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTablediv').classList.add('bg-blue-900');
    document.getElementById('assetTablebtn').classList.add('bg-blue-900');
    document.getElementById('historyTablediv').classList.remove('bg-blue-900');
    document.getElementById('historyTablebtn').classList.remove('bg-blue-900');
    document.getElementById('historyTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('historyTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTypediv').classList.remove('bg-blue-900');
    document.getElementById('assetTypebtn').classList.remove('bg-blue-900');
    document.getElementById('assetTypediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTypebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('disposedDiv').classList.remove('bg-blue-900');
    document.getElementById('disposedBtn').classList.remove('bg-blue-900');
    document.getElementById('disposedDiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('disposedBtn').classList.add('bg-sky-900', 'hover:bg-blue-900');

}


function showHistoryTable() {
    // Show the asset table
    document.getElementById('assetTypes').classList.add('hidden');
    document.getElementById('assetTable').classList.remove('hidden', 'w-full');
    document.getElementById('itemsTable').classList.add('hidden');
    document.getElementById('disposedAssets').classList.add('hidden');
    document.getElementById('assetTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTablediv').classList.remove('bg-blue-900');
    document.getElementById('assetTablebtn').classList.remove('bg-blue-900');
    document.getElementById('historyTablediv').classList.add('bg-blue-900');
    document.getElementById('historyTablebtn').classList.add('bg-blue-900');
    document.getElementById('historyTablediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('historyTablebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTypediv').classList.remove('bg-blue-900');
    document.getElementById('assetTypebtn').classList.remove('bg-blue-900');
    document.getElementById('assetTypediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTypebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('disposedDiv').classList.remove('bg-blue-900');
    document.getElementById('disposedBtn').classList.remove('bg-blue-900');
    document.getElementById('disposedDiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('disposedBtn').classList.add('bg-sky-900', 'hover:bg-blue-900');

}
function showTypesTable() {
    // Show the Asset Types table
    document.getElementById('assetTypes').classList.remove('hidden');
    document.getElementById('assetTable').classList.add('hidden');
    document.getElementById('itemsTable').classList.add('hidden');
    document.getElementById('disposedAssets').classList.add('hidden');
    document.getElementById('assetTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTablediv').classList.remove('bg-blue-900');
    document.getElementById('assetTablebtn').classList.remove('bg-blue-900');
    document.getElementById('historyTablediv').classList.remove('bg-blue-900');
    document.getElementById('historyTablebtn').classList.remove('bg-blue-900');
    document.getElementById('historyTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('historyTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTypediv').classList.add('bg-blue-900');
    document.getElementById('assetTypebtn').classList.add('bg-blue-900');
    document.getElementById('assetTypediv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTypebtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('disposedDiv').classList.remove('bg-blue-900');
    document.getElementById('disposedBtn').classList.remove('bg-blue-900');
    document.getElementById('disposedDiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('disposedBtn').classList.add('bg-sky-900', 'hover:bg-blue-900');

}

function showDisposedTable() {
    // Show the Disposed Asset table
    document.getElementById('assetTypes').classList.add('hidden');
    document.getElementById('assetTable').classList.add('hidden');
    document.getElementById('itemsTable').classList.add('hidden');
    document.getElementById('disposedAssets').classList.remove('hidden');
    document.getElementById('assetTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTablediv').classList.remove('bg-blue-900');
    document.getElementById('assetTablebtn').classList.remove('bg-blue-900');
    document.getElementById('historyTablediv').classList.remove('bg-blue-900');
    document.getElementById('historyTablebtn').classList.remove('bg-blue-900');
    document.getElementById('historyTablediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('historyTablebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTypediv').classList.remove('bg-blue-900');
    document.getElementById('assetTypebtn').classList.remove('bg-blue-900');
    document.getElementById('assetTypediv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('assetTypebtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('disposedDiv').classList.add('bg-blue-900');
    document.getElementById('disposedBtn').classList.add('bg-blue-900');
    document.getElementById('disposedDiv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('disposedBtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');

}



function addOptions() {
    // Show the addUser modal
    document.getElementById('addOptionsModal').classList.remove('hidden');
}
function cancelOptions() {
    // Hide the addUser modal
    document.getElementById('addOptionsModal').classList.add('hidden');
}

function searchQR() {
    // Show the addUser modal
    document.getElementById('searchQR').classList.remove('hidden');
}
function cancelSearchQR() {
    // Hide the addUser modal
    document.getElementById('searchQR').classList.add('hidden');
}
function showAssetForm() {
    document.getElementById('addItemModal').classList.remove('hidden');
    document.getElementById('addOptionsModal').classList.add('hidden');
}

function showAssetTypeForm() {
    document.getElementById('assetTypeForm').classList.remove('hidden');
    document.getElementById('addOptionsModal').classList.add('hidden');
}

function cancelAddassetType() {
    $('#assetTypeForm').addClass('hidden');
}

// Function to hide the Add Item modal
function cancelAddItem() {
    $('#addItemModal').addClass('hidden');
}

function editItem(qr_serial) {
    // Retrieve the row data for the given QR serial from data source
    document.getElementById('editItemModal').classList.remove('hidden');
    // Make an AJAX request to fetch the item details based on the QR serial
    $.ajax({
        type: 'POST',
        url: 'assets/php/fetch_item-edit.php', // Adjust the URL to the endpoint that fetches item details
        data: { qr_serial: qr_serial },
        dataType: 'json',
        success: function (response) {
            // Populate the form fields with the retrieved item details
            $('#qr_serial_hidden').val(qr_serial); // Set the QR serial in a hidden field for form submission
            $('#edit_qr_serial').val(qr_serial);
            $('#editItem_name').val(response.item_name);
            $('#edit_item_type').val(response.type);
            $('#edit_mode_of_procurement').val(response.mode_of_procurement);
            $('#edit_warranty_expiration').val(response.warranty_expiry_date);
            $('#edit_serial_number').val(response.serial_number);
            $('#edit_manufacturer').val(response.manufacturer);
            $('#edit_lifespan').val(response.lifespan);
            $('#edit_current_location').val(response.location);

            // Show the editItemForm modal
            document.getElementById('editItemModal').classList.remove('hidden');
        },
        error: function (error) {
            console.error('Error fetching item details:', error);
            // Display error message to the user
            alert('Error fetching item details. Please try again.');
        }
    });
}


// Function to display the uploaded image preview
function previewImage(input) {
    var preview = document.getElementById('imagePreview');
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('w-64', 'h-64', 'object-cover', 'rounded-lg');
            preview.appendChild(img);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', function () {
    previewImage(this);
});


// Function to cancel editing an item
function cancelEditItem() {
    // Hide the editItem modal
    document.getElementById('editItemModal').classList.add('hidden');
}

function deleteItem(qr_serial) {
    // Set qr_serial in the hidden input field
    document.getElementById('qr_serial').value = qr_serial;

    // Show the delete item form modal
    var modal = document.getElementById("deleteItemForm");
    modal.style.display = "block";
}

function cancelDeleteItem() {
    // Hide the delete item form modal
    var modal = document.getElementById("deleteItemForm");
    modal.style.display = "none";
}


function deleteAssetType(asset_id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this asset type?')) {
        // Perform AJAX request to delete_assetType.php
        $.ajax({
            type: 'POST',
            url: 'assets/php/delete_assetType.php',
            data: { id: asset_id },
            dataType: 'json', // Specify JSON data type
            success: function (response) {
                console.log(response);

                // Reload the DataTable after deletion
                location.reload();
            },
            error: function (error) {
                console.error('Error deleting asset type:', error);
            }
        });
    }
}

// 2 page form
function nextSection() {
    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'block';
}

function prevSection() {
    document.getElementById('section1').style.display = 'block';
    document.getElementById('section2').style.display = 'none';
}

//QR generation and Download for add
$(document).ready(function () {
    // Intercept form submission
    $('#addItemForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        // Submit form data via AJAX
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(), // Serialize form data
            dataType: 'json', // Expect JSON response
            success: function (response) {
                // Show success message
                alert("Records inserted successfully. QR Codes will be downloaded shortly.");

                // Generate and download QR codes
                generateAndDownloadQRCodes(response);
            },
            error: function (xhr, status, error) {
                // Show error message
                alert(error);
            }
        });
    });

    // Function to generate and download QR codes
    function generateAndDownloadQRCodes(qrSerials) {
        var totalDownloads = qrSerials.length;
        var downloadsCompleted = 0;

        // Iterate over each QR serial
        qrSerials.forEach(function (qrSerial) {
            // Generate QR code using qrious
            var qr = new QRious({
                value: qrSerial,
                size: 128
            });

            // Trigger download for the QR code
            downloadQRCode(qr.toDataURL(), qrSerial, function () {
                downloadsCompleted++;

                // Check if all downloads are completed
                if (downloadsCompleted === totalDownloads) {
                    // Refresh the page after all downloads are completed
                    location.reload();
                }
            });
        });
    }

    // Function to initiate download of QR code image
    function downloadQRCode(dataURL, fileName, callback) {
        // Create a temporary link element
        var downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = fileName + '.png';

        // Trigger the click event on the link to initiate download
        downloadLink.click();

        // Invoke the callback function after download is completed
        callback();
    }
});

function handleImageUpload(event) {
    // Get the uploaded file
    var file = event.target.files[0];

    // Create a FileReader object to read the file
    var reader = new FileReader();

    // Define the function to run when the file is loaded
    reader.onload = function(event) {
        // Create a new Image object
        var img = new Image();

        // Define the function to run when the image is loaded
        img.onload = function() {
            // Create a canvas element to work with jsQR
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Get the image data from the canvas
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            // Use jsQR to decode the QR code
            var code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                // QR code detected
                updateQRStatus('QR Code detected', 'green');
                console.log('QR Code detected:', code.data);
                document.getElementById('qrSerial').innerText = code.data;
            } else {
                // No QR code detected
                updateQRStatus('No QR Code detected', 'red');
                console.log('No QR Code detected');
            }
        };

        // Set the source of the Image object to the uploaded image
        img.src = event.target.result;
    };

    // Read the uploaded file as a data URL
    reader.readAsDataURL(file);
}

// Function to update QR status and enable/disable scan button
function updateQRStatus(message, color) {
    document.getElementById('qrStatus').innerText = message;
    document.getElementById('qrStatus').style.color = color;
    if (color === 'green') {
        document.getElementById('scanButton').removeAttribute('disabled');
    } else {
        document.getElementById('scanButton').setAttribute('disabled', true);
    }
}

// Function to handle QR code scanning
function scanQR() {
    // Get the hidden QR Serial decoded from the image
    var qrSerialText = document.getElementById('qrSerial').textContent;

    // Make an AJAX request to check the QR code
    $.ajax({
        type: 'GET',
        url: 'assets/php/check_qr.php',
        data: { qr_serial: qrSerialText },
        dataType: 'json',
        success: function (response) {
            if (response.exists) {
                document.getElementById('searchQR').classList.add('hidden');
                // If QR code matches an item in the database, call the editItem() function
                editItem(qrSerialText);
            } else {
                // If no item exists or no matching QR code found, show an alert
                alert("No item exists or no matching QR code found.");

            }
        },
        error: function (xhr, status, error) {
            // Handle the AJAX error
            console.error('Error checking QR code:', error);
        }
    });
}


