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
            { data: 'borrowable_items', title: 'Items Available' },
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
    // AJAX request to fetch item data
    $.ajax({
        type: 'POST',
        url: 'assets/php/fetch_item-borrow.php',
        data: { serial_code: serialCode },
        success: function (itemData) {
            console.log('Borrowing item:', itemData.serial_code);

            // Show the modal
            document.getElementById('borrowModal').classList.remove('hidden');

            // Populate the modal form with item data
            document.getElementById('serial_code').value = itemData.serial_code;
            document.getElementById('serial_code1').value = itemData.serial_code;
            document.getElementById('item_name').value = itemData.item_name;
            document.getElementById('borrowable_items').value = itemData.borrowable_items;

        },
        error: function (error) {
            console.error('Error fetching item data:', error);
        }
    });
}

function cancelBorrowItem() {
    // Hide the borrow modal
    document.getElementById('borrowModal').classList.add('hidden');
}