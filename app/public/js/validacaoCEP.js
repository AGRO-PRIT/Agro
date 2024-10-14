// // Formatar CEP enquanto o usuário digita
// function formatarCEP(input) {
//     let cep = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
//     if (cep.length > 5) {
//         cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
//     }
//     input.value = cep;
// }

// // Validação do CEP
// function validarCEP() {
//     const cep = document.getElementById('cep').value;
//     const regex = /^[0-9]{5}-?[0-9]{3}$/;
//     const mensagem = document.getElementById('cep-mensagem');

//     if (regex.test(cep)) {
//         mensagem.style.color = 'white';
//         mensagem.textContent = 'Preço frete:';
//     } else {
//         mensagem.style.color = 'red';
//         mensagem.textContent = 'CEP inválido. Por favor, digite um CEP no formato 12345-678.';
//     }
// }

function calcularFrete() {
    var cep = $('#cep').val().replace(/\D/g, '');
    var mensagem = $('#cep-mensagem');
    var endereco = $('#endereco');

    if (cep.length !== 8) {
        mensagem.text('CEP inválido.');
        endereco.text('');
        return;
    }

    $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        if (!("erro" in data)) {
            mensagem.text('');
            
            // Exibir endereço
            endereco.css('color', 'black');
            endereco.html(`Endereço: ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
            
            // Exibir valor do frete e prazo de entrega
            $('<br>').appendTo(endereco);
            endereco.append('O valor do frete é:');
            $('<br>').appendTo(endereco);
            endereco.append('O prazo de entrega é:');
        } else {
            mensagem.css('color', 'red');
            mensagem.text('CEP não encontrado.');
            endereco.text('');
        }
    }).fail(function () {
        mensagem.css('color', 'red');
        mensagem.text('Erro ao consultar o CEP.');
        endereco.text('');
    });
}

function formatarCEP(input) {
    var value = input.value.replace(/\D/g, '');
    if (value.length <= 8) {
        input.value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
}
