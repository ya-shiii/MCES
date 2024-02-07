$(document).ready(function() {
    // Fetch departments and populate dropdown
    $.ajax({
        url: 'assets/php/fetch_departments.php',
        method: 'GET',
        success: function(data) {
            var departments = JSON.parse(data);
            var departmentDropdown = $('#addDepartment');
            departmentDropdown.empty();
            departmentDropdown.append($('<option>').text('Select Department').attr('value', ''));
            departments.forEach(function(department) {
                departmentDropdown.append($('<option>').text(department.name).attr('value', department.name));
            });

            var editdepartmentDropdown = $('#editDepartment');
            editdepartmentDropdown.empty();
            editdepartmentDropdown.append($('<option>').text('Select Department').attr('value', ''));
            departments.forEach(function(department) {
                editdepartmentDropdown.append($('<option>').text(department.name).attr('value', department.name));
            });
        }
    });

    // Fetch groups and populate dropdown
    $.ajax({
        url: 'assets/php/fetch_groups.php',
        method: 'GET',
        success: function(data) {
            var groups = JSON.parse(data);
            var groupDropdown = $('#addGroup');
            groupDropdown.empty();
            groupDropdown.append($('<option>').text('Select Group').attr('value', ''));
            groups.forEach(function(group) {
                groupDropdown.append($('<option>').text(group.name).attr('value', group.name));
            });

            var editgroupDropdown = $('#editGroup');
            editgroupDropdown.empty();
            editgroupDropdown.append($('<option>').text('Select Group').attr('value', ''));
            groups.forEach(function(group) {
                editgroupDropdown.append($('<option>').text(group.name).attr('value', group.name));
            });
        }
    });
});
