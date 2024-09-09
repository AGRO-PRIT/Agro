// Formatar CEP enquanto o usuário digita
function formatarCEP(input) {
    let cep = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
    }
    input.value = cep;
}

// Validação do CEP
function validarCEP() {
    const cep = document.getElementById('cep').value;
    const regex = /^[0-9]{5}-?[0-9]{3}$/;
    const mensagem = document.getElementById('cep-mensagem');

    if (regex.test(cep)) {
        mensagem.style.color = 'white';
        mensagem.textContent = 'Preço frete:';
    } else {
        mensagem.style.color = 'red';
        mensagem.textContent = 'CEP inválido. Por favor, digite um CEP no formato 12345-678.';
    }
}
