// Function to perform smooth count-up animation
function countUpSmooth(element, targetValue, duration) {
    // Initial value
    let startValue = 0;
    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const increment = Math.floor((targetValue - startValue) * progress / duration);
        const currentValue = startValue + increment;

        element.textContent = currentValue.toLocaleString(); // Format with commas
        if (currentValue < targetValue) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = targetValue.toLocaleString(); // Ensure final value is exact
        }
    }

    requestAnimationFrame(animate);
}

// Function to update dashboard metrics
function updateDashboardMetrics() {
    // Send AJAX request to fetch data
    $.ajax({
        url: 'assets/php/admin-dashboard.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Update HTML elements with smooth count-up animation
            countUpSmooth(document.getElementById('total-assets'), response['TotalAssets'], 200);
            countUpSmooth(document.getElementById('available-assets'), response['AvailableAssets'], 200);
            countUpSmooth(document.getElementById('disposed-assets'), response['DisposedAssets'], 200);
            countUpSmooth(document.getElementById('borrowed-assets'), response['BorrowedAssets'], 200);
            countUpSmooth(document.getElementById('pending-borrow-requests'), response['PendingBorrowRequests'], 200);
            countUpSmooth(document.getElementById('pending-return-requests'), response['PendingReturnRequests'], 200);
            countUpSmooth(document.getElementById('completed-transactions'), response['CompletedTransactions'], 200);

            // Update inventory value with peso sign and smooth count-up animation
            const inventoryValueElement = document.getElementById('inventory-value');
            const inventoryValue = response['InventoryValue'];
            countUpSmooth(inventoryValueElement, inventoryValue, 200);
            inventoryValueElement.textContent = inventoryValueElement.textContent; // Add peso sign
        },
        error: function(xhr, status, error) {
            console.error('Error fetching dashboard data:', error);
        }
    });
}

// Execute updateDashboardMetrics function when the document is ready
$(document).ready(function() {
    updateDashboardMetrics();
});
