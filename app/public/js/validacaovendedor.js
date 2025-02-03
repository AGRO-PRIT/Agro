
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.cadastro-form');

  // CNPJ e CPF
    if (form) {
        const cnpjInput = form.querySelector('input[name="cnpj"]');
        const cpfInput = form.querySelector('input[name="cpf"]');

        if (cnpjInput) {
            cnpjInput.addEventListener('input', () => {
                cnpjInput.value = formatCNPJ(cnpjInput.value);
            });
        }

        if (cpfInput) {
            cpfInput.addEventListener('input', () => {
                cpfInput.value = formatCPF(cpfInput.value);
            });
        }
    }

    // Validação do formulário antes enviar
    if (form) {
        form.addEventListener('submit', function (event) {
            let isValid = true;

            // Validação CNPJ
            const cnpjInput = form.querySelector('input[name="cnpj"]');
            if (cnpjInput && !validateCNPJ(cnpjInput.value)) {
                showError(cnpjInput, 'Por favor, insira um CNPJ válido.');
                isValid = false;
            } else {
                hideError(cnpjInput);
            }

            // Validação CPF
            const cpfInput = form.querySelector('input[name="cpf"]');
            if (cpfInput && !validateCPF(cpfInput.value)) {
                showError(cpfInput, 'Por favor, insira um CPF válido.');
                isValid = false;
            } else {
                hideError(cpfInput);
            }

            // Validação e-mail
            const emailInput = form.querySelector('input[name="email"]');
            if (emailInput && !validateEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, insira um e-mail válido.');
                isValid = false;
            } else {
                hideError(emailInput);
            }

            // Validação senha
            const passwordInput = form.querySelector('input[name="password"]');
            if (passwordInput && passwordInput.value.length < 6) {
                showError(passwordInput, 'A senha deve ter pelo menos 6 caracteres.');
                isValid = false;
            } else {
                hideError(passwordInput);
            }

            // Validação confirmação senha
            const confirmPasswordInput = form.querySelector('input[name="confirm-password"]');
            if (confirmPasswordInput && confirmPasswordInput.value !== passwordInput.value) {
                showError(confirmPasswordInput, 'As senhas não correspondem.');
                isValid = false;
            } else {
                hideError(confirmPasswordInput);
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }


    function formatCNPJ(value) {
        value = value.replace(/\D/g, '');
        if (value.length > 14) value = value.slice(0, 14); 
        return value
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/\/(\d{4})(\d)/, '/$1-$2');
    }

    function formatCPF(value) {
        value = value.replace(/\D/g, ''); 
        if (value.length > 11) value = value.slice(0, 11); 
        return value
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1-$2');
    }

    function validateCNPJ(cnpj) {
        cnpj = cnpj.replace(/\D/g, ''); 
        return cnpj.length === 14; 
    }

    function validateCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); 
        return cpf.length === 11; 
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function hideError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
});