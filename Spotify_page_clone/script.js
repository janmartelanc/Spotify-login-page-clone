document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;

    // Elements
    const progressBar = document.getElementById('progress-bar');
    const stepCounter = document.getElementById('step-counter');
    const backBtn = document.getElementById('back-btn');

    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    // Password Validation
    const passwordInput = document.getElementById('password');
    const togglePwBtn = document.getElementById('toggle-pw-btn');
    const reqLetter = document.getElementById('req-letter');
    const reqNumber = document.getElementById('req-number');
    const reqLength = document.getElementById('req-length');

    // Toggle Password Visibility & Icon Change
    togglePwBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        const eyeIcon = document.getElementById('eye-icon');
        
        if (isPassword) {
            // Ko odkriješ geslo -> navadno (neprečrtano) oko
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        } else {
            // Ko skriješ geslo -> prečrtano oko
            eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        }
    });

    // Real-time Password Checking
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        
        // 1 letter check
        const hasLetter = /[a-zA-Z]/.test(val);
        reqLetter.classList.toggle('valid', hasLetter);

        // 1 number or special char check
        const hasNumOrSpec = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
        reqNumber.classList.toggle('valid', hasNumOrSpec);

        // 10 chars check
        const hasLength = val.length >= 10;
        reqLength.classList.toggle('valid', hasLength);
    });

    // Navigation & Step Logic
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

    // Step 1 -> Next Button
    document.getElementById('next-step-1').addEventListener('click', () => {
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

    // Step 2 -> Next Button
    document.getElementById('next-step-2').addEventListener('click', () => {
        const nameVal = document.getElementById('name').value.trim();
        const dayVal = document.getElementById('dob-day').value.trim();
        const monthVal = document.getElementById('dob-month').value;
        const yearVal = document.getElementById('dob-year').value.trim();
        const genderSelected = document.querySelector('input[name="gender"]:checked');

        if (nameVal && dayVal && monthVal && yearVal && genderSelected) {
            currentStep = 3;
            updateStepView();
        } else {
            Swal.fire({
                title: 'Incomplete Details',
                text: 'Please fill in all details before proceeding.',
                icon: 'warning',
                confirmButtonColor: '#1ed760'
            });
        }
    });

    // Back Button Click
    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepView();
        } else {
            // Optional: return to login or initial screen
            history.back();
        }
    });

    // Final Sign Up Button
    document.getElementById('submit-signup').addEventListener('click', () => {
        Swal.fire({
            title: 'Account Created!',
            text: 'Welcome to Spotify.',
            icon: 'success',
            confirmButtonColor: '#1ed760'
        });
    });
});