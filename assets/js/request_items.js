$(document).ready(function () {
    // Fetch item data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_item-borrow-req.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var itemData = JSON.parse(xhr.responseText);
                    //console.log('JSON response from fetch_item-borrow-req.php:', itemData);

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
            { data: 'item_count', title: 'No. of items' },
            { data: 'location', title: 'Location' },
            { data: 'date_requested', title: 'Requested' },
            { data: 'date_approved', title: 'Approved' },
            { data: 'status', title: 'Status' },
        ]
    });
}

// user full name indicator, upper screenLeft
fetch('assets/php/fetch_user_data.php')
    .then(response => response.json())
    .then(data => {
        //for debugging
        //console.log('User ID:', data.user_id);
        //console.log('Last Name:', data.last_name);

        // Display the last name in the session in the span with id 'teacher-name'
        document.getElementById('teacher-name').textContent = data.full_name;
    })
    .catch(error => console.error('Error fetching user data:', error));

