// Function to send AJAX request to update notifications
function updateNotifications() {
    // Send POST request to update-notif.php
    $.ajax({
        url: 'assets/php/update_user-notif.php',
        method: 'POST',
        success: function (response) {
            // Handle success response
            console.log('Notifications updated successfully:', response);
        },
        error: function (xhr, status, error) {
            // Handle error response
            // console.error('Failed to update notifications:', error);
        }
    });
}

// JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Get the bell icon and red indicator
    var bellIcon = document.getElementById("notif-bell");
    var redIndicator = document.getElementById("notif-red");

    // Click event listener for the bell icon
    bellIcon.addEventListener("click", function () {

        // Toggle the visibility of the overlay
        var overlay = document.getElementById("notif-pane");
        overlay.classList.toggle("hidden");
        redIndicator.classList.add("hidden");
        // Call the function to update notifications
        updateNotifications();
    });

});


$(document).ready(function () {
    // Make an AJAX request to fetch the data from the PHP script
    $.ajax({
        url: 'assets/php/fetch_user-notif.php', // Replace 'your_php_script.php' with the actual path to your PHP script
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            // Handle the successful response
            // console.log('Data received:', response);

            // Access the data received from the server
            var approvedReturns = response['Approved Returns'];
            var approvedBorrows = response['Approved Borrows'];
            var completedTransactions = response['Completed Transactions'];

            // Check if all values are 0
            if (approvedReturns === 0 && approvedBorrows === 0 && completedTransactions === 0) {
                $('#notif-content').text('No new notifications');
                // Hide the red indicator
                $('#notif-red').hide();
            } else {
                // Check and display each value individually
                
                if (approvedReturns !== 0) {
                    $('<div>').addClass('notif').html('<a href="logs.html">' + approvedReturns + ' New Pending Returns</a>').appendTo('#notif-content');
                }
                if (approvedBorrows !== 0) {
                    $('<div>').addClass('notif').html('<a href="logs.html">' + approvedBorrows + ' New Approved Borrows</a>').appendTo('#notif-content');
                }
                if (completedTransactions !== 0) {
                    $('<div>').addClass('notif').html('<a href="logs.html">' + completedTransactions + ' New Completed Transactions</a>').appendTo('#notif-content');
                }
            }
        },
        error: function (xhr, status, error) {
            // Handle any errors that occur during the AJAX request
            console.error('Error:', error);
        }
    });
});

