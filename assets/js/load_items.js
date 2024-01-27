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

function editItem(serialCode) {
    // Implement logic to edit the item
    console.log('Editing item:', serialCode);
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


