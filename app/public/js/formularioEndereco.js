const botao = document.getElementById('adicionarEndereco');
const formulario = document.getElementById('formularioEndereco');
const novoCartaoForm = document.getElementById('novoEnderecoForm');
const listaCartoes = document.getElementById('listaEnderecos');

botao.addEventListener('click', () => {
    formulario.style.display = 'flex';
});

novoCartaoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nomeCompletoEndereco = document.getElementById('nomeCompletoEndereco').value;
    const numeroTelefoneEndereco = document.getElementById('numeroTelefoneEndereco').value;
    const CEPEndereco = document.getElementById('CEPEndereco').value;
    const cidadeEndereco = document.getElementById('cidadeEndereco').value;
    const estadoEndereco = document.getElementById('estadoEndereco').value;
    const validadeCartao = document.getElementById('validadeCartao').value;
    const numeroEndereco = document.getElementById('numeroEndereco').value;
   
    const novoCartao = document.createElement('section');
    novoCartao.classList.add('informationEnderecos');
    novoCartao.innerHTML = `
                    <section class="interiorEnderecos">
                        <h2><strong>Casa do Usuario1 </strong>| ${numeroTelefoneEndereco}</h2>
                        <h2>Rua Joaninha, ${numeroEndereco} - Bairro do Kiko</h2>
                        <h2>Carpazinha,  ${estadoEndereco}, 00000000</h2>
                    </section>
                
                    <button class="padron">PADRÃO</button>
                    <article class="edition">
                        <p>Editar | Excluir</p>
                        <button class="btn-padron">Remover como padrão</button>
                    </article>

    `;

    listaCartoes.appendChild(novoCartao);

    // Limpar o formulário
    document.getElementById('numeroCartao').value = '';
    document.getElementById('nomeCartao').value = '';
    document.getElementById('cvvCartao').value = '';
    document.getElementById('validadeCartao').value = '';
    formulario.style.display = 'none';
});
