document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.cadastro-form');
    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    
    form.addEventListener('submit', function(event) {
        let valid = true;

        // Validação do email
        if (!validateEmail(emailInput.value)) {
            valid = false;
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }

        // Validação da senha
        if (passwordInput.value.length < 6) {
            valid = false;
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
