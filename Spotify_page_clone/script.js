document.addEventListener('DOMContentLoaded', () => {
const dayInput = document.getElementById('dob-day');
const yearInput = document.getElementById('dob-year');
[dayInput, yearInput].forEach(input => {
    if (input) {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/g, '');
        });
    }
});
    let currentStep = 1;
    const progressBar = document.getElementById('progress-bar');
    const stepCounter = document.getElementById('step-counter');
    const backBtn = document.getElementById('back-btn');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const nextStep1Btn = document.getElementById('next-step-1');
    const nextStep2Btn = document.getElementById('next-step-2');
    const submitSignupBtn = document.getElementById('submit-signup');
    const passwordInput = document.getElementById('password');
    const togglePwBtn = document.getElementById('toggle-pw-btn');
    const reqLetter = document.getElementById('req-letter');
    const reqNumber = document.getElementById('req-number');
    const reqLength = document.getElementById('req-length');
    togglePwBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        const eyeIcon = document.getElementById('eye-icon');
        
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
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        
        const hasLetter = /[a-zA-Z]/.test(val);
        reqLetter.classList.toggle('valid', hasLetter);

        const hasNumOrSpec = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
        reqNumber.classList.toggle('valid', hasNumOrSpec);

        const hasLength = val.length >= 10;
        reqLength.classList.toggle('valid', hasLength);
    });
    function updateStepView() {
        step1.classList.remove('active');
        step2.classList.remove('active');
        step3.classList.remove('active');

        if (currentStep === 1) {
            step1.classList.add('active');
            progressBar.style.width = '33.33%';
            stepCounter.textContent = 'Step 1 of 3';
        } else if (currentStep === 2) {
            step2.classList.add('active');
            progressBar.style.width = '66.66%';
            stepCounter.textContent = 'Step 2 of 3';
        } else if (currentStep === 3) {
            step3.classList.add('active');
            progressBar.style.width = '100%';
            stepCounter.textContent = 'Step 3 of 3';
        }
    }
    nextStep1Btn.addEventListener('click', () => {
        const val = passwordInput.value;
        const hasLetter = /[a-zA-Z]/.test(val);
        const hasNumOrSpec = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
        const hasLength = val.length >= 10;

        if (hasLetter && hasNumOrSpec && hasLength) {
            passwordInput.classList.remove('error');
            currentStep = 2;
            updateStepView();
        } else {
            passwordInput.classList.add('error');
            Swal.fire({
                title: 'Invalid Password',
                text: 'Please make sure your password meets all requirements.',
                icon: 'error',
                confirmButtonColor: '#1ed760'
            });
        }
    });
    nextStep2Btn.addEventListener('click', () => {
        const nameInput = document.getElementById('name').value.trim();
        const dayInput = document.getElementById('dob-day').value.trim();
        const monthSelect = document.getElementById('dob-month').value;
        const yearInput = document.getElementById('dob-year').value.trim();
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        if (!nameInput) {
            Swal.fire({
                title: 'Error',
                text: 'Please, input your name.',
                icon: 'error',
                confirmButtonColor: '#1ed760'
            });
            return;
        }
        if (!genderSelected) {
            Swal.fire({
                title: 'Error',
                text: 'Please, choose your gender.',
                icon: 'error',
                confirmButtonColor: '#1ed760'
            });
            return;
        }
        const day = parseInt(dayInput, 10);
        const year = parseInt(yearInput, 10);
        if (isNaN(day) || day < 1 || day > 31) {
            Swal.fire({
                title: 'Error',
                text: 'Day error.',
                icon: 'error',
                confirmButtonColor: '#1ed760'
            });
            return;
        }
        if (!monthSelect) {
            Swal.fire({
                title: 'Error',
                text: 'Please, choose a month.',
                icon: 'error',
                confirmButtonColor: '#1ed760'
            });
            return;
        }
        if (isNaN(year) || year < 1900 || year > 2026) {
            Swal.fire({
                title: 'Error',
                text: 'Year error',
                icon: 'error',
                confirmButtonColor: '#1ed760'
            });
            return;
        }
        currentStep = 3;
        updateStepView();
    });
    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepView();
        } else {
            history.back();
        }
    });
    submitSignupBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'Account Created!',
            text: 'Welcome to Spotify.',
            icon: 'success',
            confirmButtonColor: '#1ed760'
        });
    });
});