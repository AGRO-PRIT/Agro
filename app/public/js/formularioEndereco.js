const botao = document.getElementById('adicionarEndereco');
const formulario = document.getElementById('formularioEndereco');
const novoEnderecoForm = document.getElementById('novoEnderecoForm');
const listaEnderecos = document.getElementById('listaEnderecos');
const closeBtn = document.querySelector('.modal-content-endereco .close');

closeBtn.addEventListener('click', () => {
    formulario.style.display = 'none';
});

botao.addEventListener('click', () => {
    formulario.style.display = 'flex';
});

novoEnderecoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nomeCompletoEndereco = document.getElementById('nomeCompletoEndereco').value;
    const numeroTelefoneEndereco = document.getElementById('numeroTelefoneEndereco').value;
    const logradouroEndereco = document.getElementById('logradouroEndereco').value;
    const bairroEndereco = document.getElementById('bairroEndereco').value;
    const cidadeEndereco = document.getElementById('cidadeEndereco').value;
    const estadoEndereco = document.getElementById('estadoEndereco').value;
    const numeroEndereco = document.getElementById('numeroEndereco').value;

    const novoEndereco = document.createElement('section');
    novoEndereco.classList.add('informationEnderecos');
    novoEndereco.innerHTML = `
        <section class="interiorEnderecos">
            <h2><strong>${nomeCompletoEndereco}</strong> | ${numeroTelefoneEndereco}</h2>
            <h2>${logradouroEndereco}, ${numeroEndereco} - ${bairroEndereco}</h2>
            <h2>${cidadeEndereco}, ${estadoEndereco}</h2>
        </section>
        <button class="padron">PADRÃO</button>
        <article class="edition">
            <p>Editar | Excluir</p>
            <button class="btn-padron">Remover como padrão</button>
        </article>
    `;

    listaEnderecos.appendChild(novoEndereco);

    // Limpar o formulário
    novoEnderecoForm.reset();
    formulario.style.display = 'none';
});

function formatarCEP(input) {
    var value = input.value.replace(/\D/g, '');
    if (value.length <= 8) {
        input.value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
}

document.getElementById('CEPEndereco').addEventListener('blur', function() {
    var cep = this.value.replace(/\D/g, '');
    var mensagem = document.getElementById('cep-mensagem');

    if (cep.length !== 8) {
        mensagem.textContent = 'CEP inválido.';
        return;
    }

    $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function(data) {
        if (!("erro" in data)) {
            mensagem.textContent = '';
            document.getElementById('logradouroEndereco').value = data.logradouro;
            document.getElementById('bairroEndereco').value = data.bairro;
            document.getElementById('cidadeEndereco').value = data.localidade;
            document.getElementById('estadoEndereco').value = data.uf;
        } else {
            mensagem.textContent = 'CEP não encontrado.';
        }
    }).fail(function() {
        mensagem.textContent = 'Erro ao consultar o CEP.';
    });
});
