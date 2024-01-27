$(document).ready(function () {
    // Fetch item data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_b-items.php", true);

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
            { data: 'items_borrowed', title: 'Items Available' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    // Conditionally display the "Borrow" button based on borrowable_items
                    if (row.borrowable_items > 0) {
                        var borrowButton = '<button class="bg-blue-500 w-20 text-white rounded px-2 py-1 m-2" onclick="borrowItem(\'' + row.serial_code + '\')">Borrow</button>';
                        return borrowButton;
                    } else {
                        return ''; // Empty string if borrowable_items is 0
                    }
                }
            }
        ]
    });
}

function borrowItem(serialCode) {
    // Implement logic to borrow the item
    console.log('Borrowing item with serial code:', serialCode);
    // You can perform AJAX or other logic here to handle the borrowing process
}
