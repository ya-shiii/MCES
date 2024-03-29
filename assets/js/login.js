$(document).ready(function () {
    const loginForm = document.getElementById('login-form');
    const loginLink = document.getElementById('login-link');
    const registerForm = document.getElementById('register-form');
    const registerLink = document.getElementById('register-link');

    registerLink.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    loginLink.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    const registerButton = document.getElementById('register-button');


    // Fetch departments and populate dropdown
    $.ajax({
        url: 'assets/php/fetch_departments.php',
        method: 'GET',
        success: function (data) {
            var departments = JSON.parse(data);
            var departmentDropdown = $('#addDepartment');
            departmentDropdown.empty();
            departmentDropdown.append($('<option>').text('Select Department').attr('value', ''));
            departments.forEach(function (department) {
                departmentDropdown.append($('<option>').text(department.name).attr('value', department.name));
            });

        }
    });

    // Fetch groups and populate dropdown
    $.ajax({
        url: 'assets/php/fetch_groups.php',
        method: 'GET',
        success: function (data) {
            var groups = JSON.parse(data);
            var groupDropdown = $('#addGroup');
            groupDropdown.empty();
            groupDropdown.append($('<option>').text('Select Group').attr('value', ''));
            groups.forEach(function (group) {
                groupDropdown.append($('<option>').text(group.name).attr('value', group.name));
            });
        }
    });
});