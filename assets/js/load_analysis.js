$(document).ready(function () {
    // Fetch log data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/fetch_analysis.php", true); // Replace with the correct path

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var logData = JSON.parse(xhr.responseText);
                    console.log('JSON response:', logData);

                    // Display the DataTable
                    displayLogDataTable(logData);
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

function displayLogDataTable(logData) {
    // Create a DataTable with the DataTable class
    var table = $('#analyticsTable').DataTable({
        data: logData,
        columns: [
            { data: 'serial_code', title: 'Serial Code' },
            { data: 'item_name', title: 'Item Name' },
            { data: 'times_borrowed_this_month', title: 'Times Borrowed This Month' },
            { data: 'times_borrowed_all_time', title: 'Times Borrowed All Time' }
        ]
    });
}

