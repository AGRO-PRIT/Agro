const botao = document.getElementById('adicionarCartao');
const formulario = document.getElementById('formularioCartao');
const novoCartaoForm = document.getElementById('novoCartaoForm');
const listaCartoes = document.getElementById('listaCartoes');
const closeBtn = document.querySelector('.modal-content-cartao .close');

closeBtn.addEventListener('click', () => {
    formulario.style.display = 'none';
});

botao.addEventListener('click', () => {
    formulario.style.display = 'flex';
});

novoCartaoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const numeroCartao = document.getElementById('numeroCartao').value;
    const nomeCartao = document.getElementById('nomeCartao').value;
    const cvvCartao = document.getElementById('cvvCartao').value;
    const validadeCartao = document.getElementById('validadeCartao').value;

    const novoCartao = document.createElement('section');
    novoCartao.classList.add('container-cards');
    novoCartao.innerHTML = `
        <article class="card-image2">
            <img src="imagens/credit-debito.png">
            <p>Definir como padrão</p>
        </article>
        <article class="card2">
            <h3>${numeroCartao}</h3
            <p>${nomeCartao}</p>  
            <article class="remover-card">
                <img src="imagens/icon_lixeira.png">
                <strong>Excluir</strong>
            </article>
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
