document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#form-dados');
    const nomeInput = form.querySelector('input[id="nome"]');
    const cpfInput = form.querySelector('input[id="cpf"]');
    const telefoneInput = form.querySelector('input[id="telefone"]');
    const nomeError = document.getElementById('nome-error');
    const cpfError = document.getElementById('cpf-error');
    const telefoneError = document.getElementById('telefone-error');
    const emailInput = form.querySelector('input[id="email"]');
    const passwordInput = form.querySelector('input[id="senha"]');
    const senhaError = document.getElementById('senha-error');
    const emailError = document.getElementById('email-error');


    cpfInput.addEventListener('input', formatCPF);
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

        // Validação do CPF
        if (!validateCPF(cpfInput.value)) {
            valid = false;
            cpfError.style.display = 'block';
            cpfError.textContent = 'CPF inválido. Por favor, insira um CPF válido.';
        } else {
            cpfError.style.display = 'none';
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

    // Função para formatar o CPF enquanto o usuário digita
    function formatCPF(event) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }

   
    const CPFInput = document.getElementById('cpf');
    CPFInput.addEventListener('input', formatCPF);

    // Limitar o número de caracteres no campo de telefone
    CPFInput.setAttribute('maxlength', '14');

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
    

});
