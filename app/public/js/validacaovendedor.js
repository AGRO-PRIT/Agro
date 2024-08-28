// DOMContentLoaded Evitar conflitos
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona o formulário de cadastro
    const form = document.querySelector('.cadastro-form');
    // Seleciona os campos de entrada do formulário
    const cnpjInput = form.querySelector('input[name="cnpj"]');
    const cpfInput = form.querySelector('input[name="cpf"]');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const confirmPasswordInput = form.querySelector('input[name="confirm-password"]');
    // Seleciona as mensagem de erro
    const cnpjError = document.getElementById('cnpj-error');
    const cpfError = document.getElementById('cpf-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    cnpjInput.addEventListener('input', formatCNPJ);
    cpfInput.addEventListener('input', formatCPF);

    form.addEventListener('submit', function(event) {
        let valid = true;

        // Validação do CNPJ
        if (!validateCNPJ(cnpjInput.value)) {
            valid = false;
            cnpjError.style.display = 'block';
        } else {
            cnpjError.style.display = 'none';
        }

        // Validação do CPF
        if (!validateCPF(cpfInput.value)) {
            valid = false;
            cpfError.style.display = 'block';
        } else {
            cpfError.style.display = 'none';
        }

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

        // Impede o envio do formulário se alguma validação falhar

        if (!valid) {
            event.preventDefault();
        }
    });

     // Função para formatar o CNPJ enquanto o usuário digita
    function formatCNPJ(event) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }

     // Função para formatar o CPF enquanto o usuário digita
    function formatCPF(event) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }

    function validateCNPJ(cnpj) {
        return cnpj.length === 18; 
    }

    function validateCPF(cpf) {
        return cpf.length === 14; 
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
