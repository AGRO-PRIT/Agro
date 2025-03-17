const botao = document.getElementById('adicionarProduto');
const formulario = document.getElementById('formularioProduto');
const novoProdutoForm = document.getElementById('novoProdutoForm');
const listaProdutos = document.getElementById('listaProdutos');
const closeBtn = document.querySelector('.modal-content-Produto .close');

closeBtn.addEventListener('click', () => {
    formulario.style.display = 'none';
});

botao.addEventListener('click', () => {
    formulario.style.display = 'flex';
});

novoProdutoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nomeProduto = document.getElementById('nomeProduto').value;
    const precoProduto = document.getElementById('precoProduto').value;
    const quantityProduto = document.getElementById('quantityProduto').value;
    const descriptionboxProduto = document.getElementById('descriptionboxProduto').value;
    const imageProduto = document.getElementById('imageProduto').value;

    const novoProduto = document.createElement('section');
    novoProduto.classList.add('produto-detalhes');
    novoProduto.innerHTML = `
            <article class="produto-image">
                <img src="${imageProduto}">
            </article>
            <section class="produto-info">
                <h2 class="produto-nome">${nomeProduto}</h2>
                <p class="produto-preco">${precoProduto}</p>
            </section>
            <section class="produto-Units">
                <span class="produto-vendas">${quantityProduto}</span>
                <button class="edit-button">EDITAR</button>
            </section>
    `;

    listaCartoes.appendChild(novoProduto);

    // Limpar o formulário
    document.getElementById('nomeProduto').value = '';
    document.getElementById('precoProduto').value = '';
    document.getElementById('quantityProduto').value = '';
    document.getElementById('descriptionboxProduto').value = '';
    document.getElementById('imageProduto').value = '';
    document.getElementById('descriptionboxProduto').value = '';
    formulario.style.display = 'none';
});
