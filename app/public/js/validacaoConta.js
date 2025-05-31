document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const nomeInput = form.querySelector('input[name="nome_completo"]');
        const cpfInput = form.querySelector('input[name="cpf"]');
        const telefoneInput = form.querySelector('input[name="telefone"]');
        const emailInput = form.querySelector('input[name="email"]');
        const passwordInput = form.querySelector('input[name="senha"]');
        const cnpjInput = form.querySelector('input[name="cnpj"]');
        const confirmPasswordInput = form.querySelector('input[name="confirm-senha"]');

        const nomeError = form.querySelector('.error-message[name="nome-error"]');
        const cpfError = form.querySelector('.error-message[name="cpf-error"]');
        const telefoneError = form.querySelector('.error-message[name="telefone-error"]');
        const emailError = form.querySelector('.error-message[name="email-error"]');
        const senhaError = form.querySelector('.error-message[name="senha-error"]');
        const cnpjError = form.querySelector('.error-message[name="cnpj-error"]');
        const confirmPasswordError = form.querySelector('.error-message[name="confirm-senha-error"]');

        if (cpfInput) {
            cpfInput.addEventListener('input', formatCPF);
            cpfInput.setAttribute('maxlength', '14');
        }

        if (telefoneInput) {
            telefoneInput.addEventListener('input', formatTelefone);
            telefoneInput.setAttribute('maxlength', '15');
        }

        if (cnpjInput) {
            cnpjInput.addEventListener('input', () => {
                cnpjInput.value = formatCNPJ(cnpjInput.value);
            });
        }

        form.addEventListener('submit', function(event) {
            let valid = true;

    
            if (nomeInput && !validateNome(nomeInput.value)) {
                valid = false;
                showError(nomeError, 'Nome inválido. Por favor, insira seu nome completo.');
            } else if (nomeError) {
                hideError(nomeError);
            }

            
            if (cpfInput && !validateCPF(cpfInput.value)) {
                valid = false;
                showError(cpfError, 'CPF inválido. Por favor, insira um CPF válido.');
            } else if (cpfError) {
                hideError(cpfError);
            }

        
            if (telefoneInput && !validateTelefone(telefoneInput.value)) {
                valid = false;
                showError(telefoneError, 'Telefone inválido. Por favor, insira um telefone válido.');
            } else if (telefoneError) {
                hideError(telefoneError);
            }

    
            if (emailInput && !validateEmail(emailInput.value)) {
                valid = false;
                showError(emailError, 'Email inválido. Por favor, insira um email válido.');
            } else if (emailError) {
                hideError(emailError);
            }

    
            if (passwordInput && passwordInput.value.length < 6) {
                valid = false;
                showError(senhaError, 'A senha deve ter pelo menos 6 caracteres.');
            } else if (senhaError) {
                hideError(senhaError);
            }

        
            if (confirmPasswordInput && confirmPasswordInput.value !== passwordInput.value) {
                valid = false;
                showError(confirmPasswordError, 'As senhas não correspondem.');
            } else if (confirmPasswordError) {
                hideError(confirmPasswordError);
            }

    
            if (cnpjInput && !validateCNPJ(cnpjInput.value)) {
                valid = false;
                showError(cnpjError, 'CNPJ inválido. Por favor, insira um CNPJ válido.');
            } else if (cnpjError) {
                hideError(cnpjError);
            }

        
            if (!valid) {
                event.preventDefault();
            }
        });
    });

    
    function formatCPF(event) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }

    
    function formatTelefone(event) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value.replace(/(\d{2})(\d)/, '($1) $2')
                                  .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
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

    function validateNome(nome) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
        return regex.test(nome);
    }

    function validateCPF(cpf) {
        return cpf.length === 14; 
    }

    function validateTelefone(telefone) {
        return telefone.length === 15; 
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateCNPJ(cnpj) {
        cnpj = cnpj.replace(/\D/g, '');
        return cnpj.length === 14;
    }

    function showError(input, message) {
        if (input) {
            input.textContent = message;
            input.style.display = 'block';
        }
    }

    function hideError(input) {
        if (input) {
            input.style.display = 'none';
        }
    }
});