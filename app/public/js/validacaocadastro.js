document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.cadastro-form');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const confirmPasswordInput = form.querySelector('input[name="confirm-password"]');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
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

        // Validação da confirmação de senha
        if (passwordInput.value !== confirmPasswordInput.value) {
            valid = false;
            confirmPasswordError.style.display = 'block';
        } else {
            confirmPasswordError.style.display = 'none';
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
