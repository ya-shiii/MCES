document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from check_admin.php using XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/php/check_admin.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var data = JSON.parse(xhr.responseText);
                    console.log('Session Data:', data);

                    if (data.isAdmin) {
                        // User is an admin, continue loading the page
                        console.log('User is an admin');
                        // Add your startup logic here
                    } else {
                        // User is not an admin, redirect to logout
                        console.log('User is not an admin');
                        alert('Admin priviledge required to access page. Please login as admin.')
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
