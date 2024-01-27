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


const newPasswordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordMatchMsg = document.getElementById('password-match-msg');
const registerButton = document.getElementById('register-button');

confirmPasswordInput.addEventListener('keyup', () => {
    checkPasswordMatch();
});

function checkPasswordMatch() {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPasswordInput.value === "") {
        passwordMatchMsg.textContent = '';
        registerButton.disabled = true;
        registerButton.classList.add('bg-gray-400');
        registerButton.classList.add('cursor-default');
        registerButton.classList.remove('bg-blue-900');
        registerButton.classList.remove('hover:bg-blue-600');
    } else if (newPassword === confirmPassword) {
        passwordMatchMsg.textContent = 'Passwords match';
        passwordMatchMsg.style.color = 'green';
        registerButton.disabled = false;
        registerButton.classList.remove('bg-gray-400');
        registerButton.classList.remove('cursor-default');
        registerButton.classList.add('bg-blue-900');
        registerButton.classList.add('hover:bg-blue-600');
    } else {
        passwordMatchMsg.textContent = 'Passwords do not match';
        passwordMatchMsg.style.color = 'red';
        registerButton.disabled = true;
        registerButton.classList.add('bg-gray-400');
        registerButton.classList.add('cursor-default');
        registerButton.classList.remove('bg-blue-900');
        registerButton.classList.remove('hover:bg-blue-600');
    }
}