document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('gumbzelen');
    const emailInput = document.getElementById('email');
    if (submitBtn && emailInput) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const allowedEmail = 'example@gmail.com';
            if (email === allowedEmail) {
                window.location.href = 'spotfyloginkoda.html';
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'We cant find this e-mail.',
                    icon: 'error',
                    confirmButtonColor: '#1ed760'
                });
            }
        });
    }
});