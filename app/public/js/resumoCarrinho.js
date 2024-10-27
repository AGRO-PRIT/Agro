// Array para armazenar os itens do carrinho
let cartItems = [];

// Função para atualizar o resumo do carrinho
function updateCartSummary() {
    const cartSummary = document.querySelector('.cart-summary');
    cartSummary.innerHTML = ''; // Limpa o conteúdo atual

    if (cartItems.length === 0) {
        cartSummary.innerHTML = 'Seu carrinho está vazio.';
    } else {
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.style.display = 'flex';
            itemElement.style.alignItems = 'center';
            itemElement.style.marginBottom = '10px';
            itemElement.style.justifyContent = 'space-between'; 

            // Imagem do produto no resumo
            const imgElement = document.createElement('img');
            imgElement.src = item.image; // Imagem do item
            imgElement.alt = item.name;
            imgElement.style.width = '50px';
            imgElement.style.height = '50px';
            imgElement.style.objectFit = 'cover';
            imgElement.style.marginRight = '10px';

            // Nome do produto e preço unitário
            const infoElement = document.createElement('div');
            const nameElement = document.createElement('p');
            nameElement.textContent = item.name;
            nameElement.style.margin = '0'; 

            const priceElement = document.createElement('p');
            priceElement.textContent = `Preço: R$ ${item.price.toFixed(2)}`;
            priceElement.style.margin = '0'; 

            infoElement.appendChild(nameElement);
            infoElement.appendChild(priceElement);

            // Botão de menos
            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.style.width = '30px'; 
            decreaseButton.style.height = '30px';
            decreaseButton.style.marginRight = '5px';
            decreaseButton.style.cursor = 'pointer'; 
            decreaseButton.style.backgroundColor = '#f2f2f2'; 
            decreaseButton.style.border = 'none';
            decreaseButton.style.borderRadius = '5px';

            // Adiciona evento de pressionar o botão de diminuir
            decreaseButton.addEventListener('mousedown', () => {
                updateQuantity(index, -1); // Atualiza imediatamente ao pressionar
            });

            // Input de quantidade
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity || 1;
            quantityInput.min = 1;
            quantityInput.style.width = '50px';
            quantityInput.style.textAlign = 'center';
            quantityInput.style.margin = '0 5px'; 
            quantityInput.style.border = 'none'; 
            quantityInput.style.backgroundColor = 'transparent'; 
            quantityInput.style.outline = 'none';

            quantityInput.addEventListener('change', (e) => {
                item.quantity = parseInt(e.target.value);
                updateCartSummary(); // Atualiza o resumo quando a quantidade muda
            });

            // Botão de mais
            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.style.width = '30px'; 
            increaseButton.style.height = '30px';
            increaseButton.style.marginLeft = '5px';
            increaseButton.style.cursor = 'pointer'; 
            increaseButton.style.backgroundColor = '#f2f2f2'; 
            increaseButton.style.border = 'none';
            increaseButton.style.borderRadius = '5px';

            // Adiciona evento de pressionar o botão
            increaseButton.addEventListener('mousedown', () => {
                updateQuantity(index, 1); // Atualiza imediatamente ao pressionar
            });

            // Calcula o preço total do item com base na quantidade
            const itemTotalPrice = item.price * item.quantity;
            totalPrice += itemTotalPrice;

            // Alinha os elementos à direita
            const controlsContainer = document.createElement('div');
            controlsContainer.style.display = 'flex';
            controlsContainer.style.alignItems = 'center';
            controlsContainer.style.marginLeft = 'auto'; // Faz o container ocupar o espaço restante
            controlsContainer.appendChild(decreaseButton);
            controlsContainer.appendChild(quantityInput);
            controlsContainer.appendChild(increaseButton);

            // Adiciona imagem, informações e controle de quantidade ao item do carrinho
            itemElement.appendChild(imgElement);
            itemElement.appendChild(infoElement);
            itemElement.appendChild(controlsContainer);
            cartSummary.appendChild(itemElement);
        });

        // Exibir o preço total e o botão "Ir para o Carrinho" lado a lado
        const totalAndButtonContainer = document.createElement('div');
        totalAndButtonContainer.style.display = 'flex';
        totalAndButtonContainer.style.alignItems = 'center'; // Alinha verticalmente
        totalAndButtonContainer.style.justifyContent = 'space-between'; // Espaço entre os elementos
        totalAndButtonContainer.style.marginTop = '10px'; // Adiciona espaço acima

        // Exibir o preço total
        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Preço Total: R$ ${totalPrice.toFixed(2)}`;
        totalPriceElement.style.fontWeight = 'bold';
        totalPriceElement.style.fontSize = '18px';
        totalPriceElement.style.color = '#493A31';
        totalAndButtonContainer.appendChild(totalPriceElement);

        // Botão "Ir para o Carrinho"
        const goToCartButton = document.createElement('a');
        goToCartButton.href = '/carrinho'; // Link para a página do carrinho
        goToCartButton.textContent = 'Ir para o Carrinho';
        goToCartButton.style.backgroundColor = '#5AA504';
        goToCartButton.style.color = 'white';
        goToCartButton.style.padding = '10px';
        goToCartButton.style.width = '150px';
        goToCartButton.style.borderRadius = '5px';
        goToCartButton.style.textDecoration = 'none';
        goToCartButton.style.marginLeft = '10px'; // Adiciona espaço à esquerda
        totalAndButtonContainer.appendChild(goToCartButton);

        cartSummary.appendChild(totalAndButtonContainer); // Adiciona o container com preço total e botão ao resumo
    }
}

// Função para atualizar a quantidade do item
// Função para atualizar a quantidade do item
function updateQuantity(index, change) {
    if (cartItems[index]) {
        // Atualiza a quantidade no array cartItems
        cartItems[index].quantity = (cartItems[index].quantity || 1) + change;

        // Evita que a quantidade fique negativa
        if (cartItems[index].quantity < 1) {
            cartItems[index].quantity = 1;
        }

        // Atualiza o resumo do carrinho
        updateCartSummary();

        // Atualiza a contagem total de itens no carrinho
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.style.display = 'block'; // Mostra o contador
    }
}
// Seleciona todos os botões de "Adicionar"
const addToCartButtons = document.querySelectorAll('.add-to-cart, .botao-add, .botao-adicionar');

// Adiciona o evento de clique para cada botão
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productInfo = button.closest('.box-produto, .carousel-item, .carousel-item2, .info-geral'); // Usa closest para buscar o container correto
        const productName = productInfo.querySelector('.product-name, .product-name2, .nome-produto, .tittle-p').textContent; // Nome do produto
        const productPrice = parseFloat(productInfo.querySelector('.product-price, .valor-produto, .price-p').textContent.replace('R$', '').trim()); // Preço do produto
        const productImage = productInfo.querySelector('img').src; // Busca a imagem diretamente dentro do container correto

        // Verifica se o produto já está no carrinho
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);
        if (existingItemIndex !== -1) {
            // Se o produto já estiver no carrinho, aumenta a quantidade
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // Adiciona o produto ao array cartItems com nome, preço, imagem e quantidade inicial
            cartItems.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        // Atualiza a contagem total de itens no carrinho
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.style.display = 'block'; // Mostra o contador

        // Atualiza o resumo do carrinho
        updateCartSummary();

        // Exibe mensagem de produto adicionado com imagem e nome
        showAddedMessage(productName, productImage);
    });
});


// Função para mostrar mensagem de produto adicionado
function showAddedMessage(productName, productImage) {
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.bottom = '20px';
    message.style.left = '80%';
    message.style.transform = 'translateX(-50%)'; // Centraliza horizontalmente
    message.style.backgroundColor = '#5AA504';
    message.style.color = 'white';
    message.style.padding = '25px';
    message.style.width = '550px';
    message.style.borderRadius = '10px';
    message.style.display = 'flex';
    message.style.alignItems = 'center';
    message.style.justifyContent = 'center'; // Centraliza o conteúdo
    message.style.zIndex = '1000';
    message.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Adiciona uma sombra suave

    // Imagem do produto
    const imgElement = document.createElement('img');
    imgElement.src = productImage;
    imgElement.alt = productName;
    imgElement.style.width = '70px';
    imgElement.style.height = 'auto';
    imgElement.style.display = 'block';
    imgElement.style.objectFit = 'cover';
    imgElement.style.marginRight = '5px';

    // Texto com o nome do produto
    const textElement = document.createElement('span');
    textElement.textContent = `${productName} Adicionado ao carrinho! `;
    message.style.fontSize = '20px'; // Ajusta o tamanho da fonte para centralizar melhor

    // Ícone de verificação 
    const iconElement = document.createElement('i');
    iconElement.classList.add('fas', 'fa-check-circle');
    iconElement.style.fontSize = '20px'; 
    iconElement.style.marginLeft = '10px';
    iconElement.style.color = 'white'; 

    // Adiciona a imagem, o texto e o ícone ao pop-up
    message.appendChild(imgElement);
    message.appendChild(textElement);
    message.appendChild(iconElement);

    document.body.appendChild(message);

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Seleciona os elementos do carrinho e o resumo
const cartIcon = document.querySelector('.carrinho');

// Exibe o resumo do carrinho ao passar o mouse
cartIcon.addEventListener('mouseenter', () => {
    if (cartItems.length > 0) { // Verifica se há itens no carrinho
        updateCartSummary(); // Atualiza o resumo do carrinho
        const cartSummary = document.querySelector('.cart-summary');
        cartSummary.style.display = 'block'; // Mostra o resumo
    }
    
});

// Oculta o resumo do carrinho quando o mouse sai
cartIcon.addEventListener('mouseleave', () => {
    const cartSummary = document.querySelector('.cart-summary');
    cartSummary.style.display = 'none'; // Oculta o resumo
});
