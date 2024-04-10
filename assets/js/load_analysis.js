// Function to fetch data for a specific dataset using AJAX [Last 7 days]
function fetchWeekDataForDataset(url, label, borderColor) {
    // Perform AJAX request
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            // Check if data is retrieved successfully
            if (response.success) {
                // Log the response data to the console for debugging
                // console.log(label + ' data:', response.data);

                // Extract data from the response
                var data = response.data;

                // Create the dataset
                var dataset = {
                    label: label,
                    data: data,
                    borderColor: borderColor,
                    borderWidth: 5,
                    fill: true
                };

                // Add the dataset to the chart
                addWeekDatasetToChart(dataset);
            } else {
                // Handle error if data retrieval fails
                console.error('Failed to fetch data for dataset:', label);
            }
        },
        error: function (xhr, status, error) {
            // Handle AJAX error
            console.error('AJAX error:', error);
        }
    });
}

// Function to add a dataset to the chart
function addWeekDatasetToChart(dataset) {
    // Add the dataset to the chart's datasets array
    weekChart.data.datasets.push(dataset);

    // Update the chart
    weekChart.update();
}

// Get the last 7 days
var labels = getLast7Days();

// Create the chart
var ctx = document.getElementById('weekChart').getContext('2d');
var weekChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: []
    },
    options: {
        title: {
            display: true,
            text: 'Last 7 days'
        },
    }
});

// Fetch data for each dataset
fetchWeekDataForDataset('assets/php/fetch_weeklyadd.php', 'New Asset', 'green');
fetchWeekDataForDataset('assets/php/fetch_weeklyborrow.php', 'Borrowed Items', 'blue');
fetchWeekDataForDataset('assets/php/fetch_weeklydispo.php', 'Disposed Items', 'red');


// Function to get the last 7 days including today
function getLast7Days() {
    var dates = [];
    var today = new Date();
    for (var i = 0; i < 7; i++) {
        var date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        var day = date.toLocaleDateString('en-US', { weekday: 'long' });
        if (i === 6) {
            day += " (Today)";
        }
        dates.push(day);
    }
    return dates;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Function to fetch data for a specific dataset using AJAX [Last 6 weeks]
function fetchMonthDataForDataset(url, label, borderColor) {
    // Perform AJAX request
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            // Check if data is retrieved successfully
            if (response.success) {
                // Log the response data to the console for debugging
                // console.log(label + ' data:', response.data);

                // Extract data from the response
                var data = response.data;

                // Create the dataset
                var dataset = {
                    label: label,
                    data: data,
                    borderColor: borderColor,
                    borderWidth: 5,
                    fill: true
                };

                // Add the dataset to the chart
                addMonthDatasetToChart(dataset);
            } else {
                // Handle error if data retrieval fails
                console.error('Failed to fetch data for dataset:', label);
            }
        },
        error: function (xhr, status, error) {
            // Handle AJAX error
            console.error('AJAX error:', error);
        }
    });
}

// Function to add a dataset to the chart
function addMonthDatasetToChart(dataset) {
    // Add the dataset to the chart's datasets array
    monthChart.data.datasets.push(dataset);

    // Update the chart
    monthChart.update();
}

// Get the last 6 weeks
var labels = getLast6Weeks();

// Create the chart
var ctx = document.getElementById('monthChart').getContext('2d');
var monthChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: []
    },
    options: {
        title: {
            display: true,
            text: 'Last 6 weeks'
        },
    }
});

// Fetch data for each dataset
fetchMonthDataForDataset('assets/php/fetch_monthlyadd.php', 'New Asset', 'green');
fetchMonthDataForDataset('assets/php/fetch_monthlyborrow.php', 'Borrowed Items', 'blue');
fetchMonthDataForDataset('assets/php/fetch_monthlydispo.php', 'Disposed Items', 'red');

// Function to get the last 6 weeks including "This Week"
function getLast6Weeks() {
    var weeks = [];
    var today = new Date();

    // Get the current day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    var currentDayOfWeek = today.getDay();

    // Calculate the start date of the current week (Sunday)
    var startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDayOfWeek);

    for (var i = 0; i < 6; i++) {
        // Calculate the end date of the current week (Saturday)
        var endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        var weekRange = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + " - " +
            endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // If it's the last iteration, add (This Week) to the label
        if (i === 0) {
            weekRange += " (This Week)";
        }

        weeks.push(weekRange);

        // Move startDate to the start of the previous week (Sunday)
        startDate.setDate(startDate.getDate() - 7);
    }

    return weeks.reverse(); // Reverse the array to display in ascending order
}





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Function to fetch data for a specific dataset using AJAX [Last 6 months]
function fetchYearDataForDataset(url, label, borderColor) {
    // Perform AJAX request
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            // Check if data is retrieved successfully
            if (response.success) {
                // Log the response data to the console for debugging
                // console.log(label + ' data:', response.data);

                // Extract data from the response
                var data = response.data;

                // Create the dataset
                var dataset = {
                    label: label,
                    data: data,
                    borderColor: borderColor,
                    borderWidth: 5,
                    fill: true
                };

                // Add the dataset to the chart
                addYearDatasetToChart(dataset);
            } else {
                // Handle error if data retrieval fails
                console.error('Failed to fetch data for dataset:', label);
            }
        },
        error: function (xhr, status, error) {
            // Handle AJAX error
            console.error('AJAX error:', error);
        }
    });
}

// Function to add a dataset to the chart
function addYearDatasetToChart(dataset) {
    // Add the dataset to the chart's datasets array
    yearChart.data.datasets.push(dataset);

    // Update the chart
    yearChart.update();
}

// Get the last 6 months
var labels = getLast6Months();

// Create the chart
var ctx = document.getElementById('yearChart').getContext('2d');
var yearChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: []
    },
    options: {
        title: {
            display: true,
            text: 'Last 6 Months'
        },
    }
});

// Fetch data for each dataset
fetchYearDataForDataset('assets/php/fetch_yearlyadd.php', 'New Asset', 'green');
fetchYearDataForDataset('assets/php/fetch_yearlyborrow.php', 'Borrowed Items', 'blue');
fetchYearDataForDataset('assets/php/fetch_yearlydispo.php', 'Disposed Items', 'red');

// Function to get the last 6 months including "This Month"
function getLast6Months() {
    var months = [];
    var today = new Date();
    for (var i = 5; i >= 0; i--) {
        var monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1);
        var monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);

        var monthRange = monthStart.toLocaleDateString('en-US', { month: 'long' }) + " " + monthStart.getFullYear();
        if (i === 0) {
            monthRange += " (This Month)";
        }
        months.push(monthRange);
    }
    return months;
}

daysChart();


//saving pdf
function savePDF() {
    // Get the current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    var filename = 'MCES_Inventory_System_' + yyyy + '-' + mm + '-' + dd + '.png';

    // Capture only the specific div with id "screenshotdiv"
    html2canvas(document.getElementById('screenshotdiv')).then(function(canvas) {
        var imageData = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.href = imageData;
        link.download = filename; // Set the filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}



// Function to get current date in the format YYYY-MM-DD
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return year + '-' + month + '-' + day;
}





// interactive buttons
function daysChart() {
    // Show the pending table
    document.getElementById('weekly-chart').classList.remove('hidden');
    document.getElementById('monthly-chart').classList.add('hidden');
    document.getElementById('yearly-chart').classList.add('hidden');
    document.getElementById('daysChartdiv').classList.add('bg-blue-900');
    document.getElementById('daysChartbtn').classList.add('bg-blue-900');
    document.getElementById('daysChartdiv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('daysChartbtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('weeksChartdiv').classList.remove('bg-blue-900');
    document.getElementById('weeksChartbtn').classList.remove('bg-blue-900');
    document.getElementById('weeksChartdiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('weeksChartbtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('monthChartdiv').classList.remove('bg-blue-900');
    document.getElementById('monthChartbtn').classList.remove('bg-blue-900');
    document.getElementById('monthChartdiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('monthChartbtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
}
function weeksChart() {
    // Show the pending table
    document.getElementById('weekly-chart').classList.add('hidden');
    document.getElementById('monthly-chart').classList.remove('hidden');
    document.getElementById('yearly-chart').classList.add('hidden');
    document.getElementById('daysChartdiv').classList.remove('bg-blue-900');
    document.getElementById('daysChartbtn').classList.remove('bg-blue-900');
    document.getElementById('daysChartdiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('daysChartbtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('weeksChartdiv').classList.add('bg-blue-900');
    document.getElementById('weeksChartbtn').classList.add('bg-blue-900');
    document.getElementById('weeksChartdiv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('weeksChartbtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('monthChartdiv').classList.remove('bg-blue-900');
    document.getElementById('monthChartbtn').classList.remove('bg-blue-900');
    document.getElementById('monthChartdiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('monthChartbtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
}
function monthsChart() {
    // Show the pending table
    document.getElementById('weekly-chart').classList.add('hidden');
    document.getElementById('monthly-chart').classList.add('hidden');
    document.getElementById('yearly-chart').classList.remove('hidden');
    document.getElementById('daysChartdiv').classList.remove('bg-blue-900');
    document.getElementById('daysChartbtn').classList.remove('bg-blue-900');
    document.getElementById('daysChartdiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('daysChartbtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('weeksChartdiv').classList.remove('bg-blue-900');
    document.getElementById('weeksChartbtn').classList.remove('bg-blue-900');
    document.getElementById('weeksChartdiv').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('weeksChartbtn').classList.add('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('monthChartdiv').classList.add('bg-blue-900');
    document.getElementById('monthChartbtn').classList.add('bg-blue-900');
    document.getElementById('monthChartdiv').classList.remove('bg-sky-900', 'hover:bg-blue-900');
    document.getElementById('monthChartbtn').classList.remove('bg-sky-900', 'hover:bg-blue-900');
}
