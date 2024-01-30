document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from check_teacher.php using XMLHttpRequest
    checkTeacher();
});

function checkTeacher() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/check_teacher.php", true);

    var logoutTimer; // Variable to store the timeout ID

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var data = JSON.parse(xhr.responseText);
                    console.log('Session Data:', data);

                    if (data.isUser) {
                        // User is a teacher, continue loading the page

                        // Set a timer for 5 minutes (300000 milliseconds)
                        logoutTimer = setTimeout(logoutUser, 300000);

                        console.log('User is a teacher');
                        // Add your startup logic here
                    } else {
                        // User not found or not a teacher, redirect to logout
                        console.log('User not found or not a teacher');
                        alert('Teacher privilege required to access page. Please log in as teacher.');
                        window.location.href = 'assets/php/logout.php';
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            } else {
                console.error('Error fetching data. Status:', xhr.status);
            }
        }
    };

    xhr.send();

    // Function to logout the user
    function logoutUser() {
        alert('Logout due to inactivity.');
        window.location.href = 'assets/php/logout.php';
    }

    // Add event listeners to reset the timer on user activity
    document.addEventListener('mousemove', resetLogoutTimer);
    document.addEventListener('keydown', resetLogoutTimer);

    // Function to reset the logout timer
    function resetLogoutTimer() {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(logoutUser, 300000); // Reset the timer to 5 minutes
    }
}
