document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#form-dados');
    const nomeInput = form.querySelector('input[id="nome"]');
    const cnpjInput = form.querySelector('input[id="cnpj"]');
    const telefoneInput = form.querySelector('input[id="telefone"]');
    const nomeError = document.getElementById('nome-error');
    const cnpjError = document.getElementById('cnpj-error');
    const telefoneError = document.getElementById('telefone-error');
    const emailInput = form.querySelector('input[id="email"]');
    const passwordInput = form.querySelector('input[id="senha"]');
    const senhaError = document.getElementById('senha-error');
    const emailError = document.getElementById('email-error');

    cnpjInput.addEventListener('input', formatCNPJ);
    telefoneInput.addEventListener('input', formatTelefone);

    form.addEventListener('submit', function(event) {
        let valid = true;

        // Validação do Nome
        if (!validateNome(nomeInput.value)) {
            valid = false;
            nomeError.style.display = 'block';
            nomeError.textContent = 'Nome inválido. Por favor, insira seu nome completo.';
        } else {
            nomeError.style.display = 'none';
        }

        // Validação do CNPJ
        if (!validateCNPJ(cnpjInput.value)) {
            valid = false;
            cnpjError.style.display = 'block';
            cnpjError.textContent = 'CNPJ inválido. Por favor, insira um CNPJ válido.';
        } else {
            cnpjError.style.display = 'none';
        }

        // Validação do Telefone
        if (!validateTelefone(telefoneInput.value)) {
            valid = false;
            telefoneError.style.display = 'block';
            telefoneError.textContent = 'Telefone inválido. Por favor, insira um telefone válido.';
        } else {
            telefoneError.style.display = 'none';
        }

        // Validação do Email
        if (!validateEmail(emailInput.value)) {
            valid = false;
            emailError.style.display = 'block';
            emailError.textContent = 'Email inválido. Por favor, insira um email válido.';
        } else {
            emailError.style.display = 'none';
        }

        // Validação da Senha
        if (passwordInput.value.length < 6) {
            valid = false;
            senhaError.style.display = 'block';
            senhaError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        } else {
            senhaError.style.display = 'none';
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

    const CNPJInput = document.getElementById('cnpj');
    CNPJInput.addEventListener('input', formatCNPJ);

    // Limitar o número de caracteres no campo de CNPJ
    CNPJInput.setAttribute('maxlength', '18'); // 14 números + 4 separadores

    // Função para formatar o Telefone enquanto o usuário digita
    function formatTelefone(event) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value.replace(/(\d{2})(\d)/, '($1) $2')
                                  .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }

    const numeroTelefoneInput = document.getElementById('telefone');
    numeroTelefoneInput.addEventListener('input', formatTelefone);

    // Limitar o número de caracteres no campo de telefone
    numeroTelefoneInput.setAttribute('maxlength', '15');

    function validateNome(nome) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
        return regex.test(nome);
    }

    function validateCNPJ(cnpj) {
        // Validação básica do comprimento do CNPJ
        return cnpj.length === 18; // 14 números + 4 separadores
    }

    function validateTelefone(telefone) {
        return telefone.length === 15; 
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
