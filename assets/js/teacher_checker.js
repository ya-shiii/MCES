document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from check_admin.php using XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/check_teacher.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var data = JSON.parse(xhr.responseText);
                    console.log('Session Data:', data);

                    if (data.isUser) {
                        // User is a teacher, continue loading the page
                        console.log('User is a teacher');
                        // Add your startup logic here
                    } else {
                        // User not found or not a teacher, redirect to logout
                        console.log('User not found or not a teacher');
                        alert('Teacher privilege required to access page. Please login as teacher.');
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
});
