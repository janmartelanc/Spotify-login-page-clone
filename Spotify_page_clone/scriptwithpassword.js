document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePwBtn = document.getElementById('toggle-pw-btn');
    const eyeIcon = document.getElementById('eye-icon');
    const backBtn = document.getElementById('back-btn');
    const loginForm = document.getElementById('login-form');
    if (togglePwBtn) {
        togglePwBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            if (isPassword) {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
            }
        });
    }
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value.trim() : '';
            const allowedEmail = 'example@gmail.com';
            const allowedPassword = 'example@gmail.com';
            if (email === allowedEmail && password === allowedPassword) {
                Swal.fire({
                    title: 'Login uspešen!',
                    icon: 'success',
                    confirmButtonColor: '#1ed760',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    title: 'Napaka',
                    text: 'Napačen e-poštni naslov ali geslo.',
                    icon: 'error',
                    confirmButtonColor: '#1ed760'
                });
            }
        });
    }
});