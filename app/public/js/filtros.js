document.getElementById('category-filters').onsubmit = function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const categories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value);
    const sort = document.querySelector('input[name="sort"]:checked')?.value;

    // Cria a string de parâmetros da URL
    const params = new URLSearchParams();
    if (categories.length > 0) {
        params.append('categories', categories.join(','));
    }
    if (sort) {
        params.append('sort', sort);
    }

    // Redireciona para a mesma página com os parâmetros
    window.location.search = params.toString();
};

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const categories = params.get('categories') ? params.get('categories').split(',') : [];
    const sort = params.get('sort');

    // Marcar as caixas de seleção de categorias
    categories.forEach(category => {
        const checkbox = document.querySelector(`input[name="category"][value="${category}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });

    // Marcar o botão de ordenação
    if (sort) {
        const radio = document.querySelector(`input[name="sort"][value="${sort}"]`);
        if (radio) {
            radio.checked = true;
        }
    }

    // Aqui você pode adicionar lógica para aplicar os filtros nos produtos
    // Exemplo: filtrar e renderizar os produtos de acordo com os parâmetros
    // renderProducts(categories, sort);
};

function renderProducts(selectedCategories, selectedSort) {
    const allProducts = document.querySelectorAll('.product'); // Selecione todos os produtos

    allProducts.forEach(product => {
        const productCategories = product.dataset.categories.split(','); // Supondo que cada produto tem um data-attribute com suas categorias

        // Verifica se o produto pertence a alguma categoria selecionada
        const isVisible = selectedCategories.length === 0 || selectedCategories.some(cat => productCategories.includes(cat));
        
        product.style.display = isVisible ? 'block' : 'none'; // Mostra ou oculta o produto
    });

    // Lógica de ordenação pode ser implementada aqui também
}
