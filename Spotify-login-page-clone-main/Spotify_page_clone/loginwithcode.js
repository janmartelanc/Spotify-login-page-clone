document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.inputt');
    const submitBtn = document.getElementById('gumbzelen');
    const resendBtn = document.getElementById('resend');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            const allowedKeys = ['Backspace', 'Tab', 'Enter', 'Delete', 'ArrowLeft', 'ArrowRight'];
            if (allowedKeys.includes(e.key)) {
                return;
            }
            if (!/^[0-9]$/.test(e.key)) {
                e.preventDefault();
            }
        });
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.length >= 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let enteredCode = '';
            inputs.forEach(input => {
                enteredCode += input.value.trim();
            });
            const correctCode = '676767';
            if (enteredCode === correctCode) {
                Swal.fire({
                    title: 'Login successful!',
                    icon: 'success',
                    confirmButtonColor: '#1ed760',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Code is wrong, try again.',
                    icon: 'error',
                    confirmButtonColor: '#1ed760'
                });
            }
        });
    }
    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Resend!',
                text: 'The code was sent.',
                icon: 'success',
                confirmButtonColor: '#1ed760'
            });
        });
    }
});