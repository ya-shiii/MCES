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
            { data: 'item_name', title: 'Item Name' },
            { data: 'item_type', title: 'Item Type' },
            { data: 'available_items', title: 'Available' },
            { data: 'location', title: 'Location' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    //  display the "Borrow" button
                    var borrowButton = '<button class="bg-blue-500 w-20 text-white rounded px-2 py-1 m-2" onclick="borrowItem(\'' + row.log_id + '\')">Borrow</button>';
                    return borrowButton;

                }
            }
        ]
    });
}

function borrowItem(logID) {
    // AJAX request to fetch item data
    $.ajax({
        type: 'POST',
        url: 'assets/php/fetch_item-borrow.php',
        data: { log_id: logID },
        success: function (itemData) {
            console.log('Borrowing item:', itemData.log_id);

            // Show the modal
            document.getElementById('borrowModal').classList.remove('hidden');

            // Populate the modal form with item data
            document.getElementById('log_id').value = itemData.log_id;
            document.getElementById('item_name').value = itemData.item_name;
            document.getElementById('item_type').value = itemData.item_type;
            
            // Limit the input of the "Number of Items" field based on available items
            var availableItems = itemData.available_items;
            var itemCountInput = document.getElementById('item_count');
            itemCountInput.setAttribute('max', availableItems);

            // Add event listener to alert if input exceeds max value
            itemCountInput.addEventListener('input', function () {
                var enteredValue = parseInt(this.value);
                if (enteredValue > availableItems) {
                    alert('You cannot borrow more than ' + availableItems + ' items.');
                    this.value = availableItems; // Set the input value to the maximum allowed
                }
            });
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





// user full name indicator, upper screenLeft
fetch('assets/php/fetch_user_data.php')
    .then(response => response.json())
    .then(data => {
        //for debugging
        //console.log('User ID:', data.user_id);
        //console.log('Last Name:', data.full_name);

        // Display the last name in the session in the span with id 'teacher-name'
        document.getElementById('teacher-name').textContent = data.full_name;
    })
    .catch(error => console.error('Error fetching user data:', error));

