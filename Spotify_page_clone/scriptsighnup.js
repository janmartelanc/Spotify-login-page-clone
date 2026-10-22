document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('gumbzelen');
    const emailInput = document.getElementById('email');

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailInput ? emailInput.value.trim() : '';
            if (email.includes('@') && email.includes('.')) {
                window.location.href = 'spotifysighnup1.html';
            } else {
                Swal.fire({
                    title: 'Napaka',
                    text: 'Prosim, vnesi veljaven e-poštni naslov.',
                    icon: 'error',
                    confirmButtonColor: '#1ed760'
                });
            }
        });
    }
});