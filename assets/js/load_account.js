// Fetch account information using AJAX
fetch('assets/php/fetch_acc_info.php')
.then(response => response.json())
.then(data => {
    // Populate form fields with fetched data
    document.getElementById('username').value = data.username;
    document.getElementById('first_name').value = data.first_name;
    document.getElementById('last_name').value = data.last_name;
    document.getElementById('email').value = data.email;
    document.getElementById('password').value = ''; // For security reasons, it's better not to show passwords
    document.getElementById('department').value = data.department;
})
.catch(error => console.error('Error fetching account information:', error));