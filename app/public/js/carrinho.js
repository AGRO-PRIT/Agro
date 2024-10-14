if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Variável global para o valor total
var totalAmount = "0,00";

// Função carregamento de cada constante
function ready() {
    const removeProductButtons = document.getElementsByClassName("excluir");
    for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct);
    }

    const removeImageButtons = document.getElementsByClassName("removimg");
    for (var i = 0; i < removeImageButtons.length; i++) {
        removeImageButtons[i].addEventListener("click", removeProduct);
    }

    const quantityInputs = document.getElementsByClassName("product-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", updateTotal);
    }

    const addToCartButtons = document.getElementsByClassName("add-to-cart");
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart);
    }

    const increaseQuantityButtons = document.getElementsByClassName("mais");
    for (let i = 0; i < increaseQuantityButtons.length; i++) {
        increaseQuantityButtons[i].addEventListener("click", increaseQuantity);
    }

    const decreaseQuantityButtons = document.getElementsByClassName("menos");
    for (let i = 0; i < decreaseQuantityButtons.length; i++) {
        decreaseQuantityButtons[i].addEventListener("click", decreaseQuantity);
    }

    const purchaseButton = document.getElementsByClassName("checkout-button")[0];
    purchaseButton.addEventListener("click", makePurchase);

    updateTotal();
    updateCartCount();
}

// Mensagem ao finalizar a compra + verificação de mensagem de carrinho vazio
function makePurchase() {
    if (totalAmount == "0,00") {
        alert("Seu carrinho está vazio!");
    } else {
        alert(`
            Obrigado pela sua compra!
            Valor do pedido: ${totalAmount}
            Volte sempre!
        `);
    }
}

// Adicionar cada produto ao clicar em "adicionar"
function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement.parentElement;

    // Imagem e nome do produto
    const productImage = productInfos.getElementsByClassName("product-image")[0].src;
    const productTitle = productInfos.getElementsByClassName("product-name")[0].innerText;

    // Preço: buscar preço atual, se disponível, ou o preço antigo
    const currentPriceElement = productInfos.querySelector(".current-price");
    const oldPriceElement = productInfos.querySelector(".old-price");

    let productPrice;
    if (currentPriceElement) {
        productPrice = currentPriceElement.innerText.replace("R$ ", "R$");
    } else if (oldPriceElement) {
        productPrice = oldPriceElement.innerText.replace("R$ ", "R$");
    }

    const productsCartName = document.getElementsByClassName("cart-product-title");
    for (var i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText == productTitle) {
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-quantity")[0].value++;
            updateTotal();
            updateCartCount();
            return;
        }
    }

    // Importação do HTML imposto de cada item tal como pegar informação de cada produto para adicionar
    let newCartProduct = document.createElement("article");
    newCartProduct.classList.add("cart-item");

    newCartProduct.innerHTML =
    `
        <img src="${productImage}" alt="${productTitle}">
        <article class="details">
            <h3 class="cart-product-title">${productTitle}</h3>
            <p class="vendor">NomedoVendedor</p>
            <article class="quantity">
                <button class="menos">-</button>
                <input type="number" class="product-quantity" value="1" min="1" max="200"> 
                <button class="mais">+</button>
            </article>
        </article>
        <article class="price">
            <h3 class="cart-item-price">${productPrice}</h3>
            <article class="remove">
                <img class="removimg" src="imagens/icon_lixeira.png" alt="icone de uma lixeira">  
                <i class="excluir">Excluir</i>
            </article>
        </article>
    `;

    const cart = document.querySelector(".cart-itens");
    cart.append(newCartProduct);

    // Chamar eventos
    newCartProduct.querySelector(".product-quantity").addEventListener("change", updateTotal);
    newCartProduct.querySelector(".excluir").addEventListener("click", removeProduct);
    newCartProduct.querySelector(".mais").addEventListener("click", increaseQuantity);
    newCartProduct.querySelector(".menos").addEventListener("click", decreaseQuantity);
    checkIfCartIsEmpty(); 
    updateCartCount();
    updateTotal();
}

// Botão de mais funcionar e adicionar um item
function increaseQuantity(event) {
    let quantityInput = event.target.parentElement.querySelector(".product-quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotal();
    updateCartCount();
}

// Botão de menos funcionar e tirar um item
function decreaseQuantity(event) {
    let quantityInput = event.target.parentElement.querySelector(".product-quantity");
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updateTotal();
        updateCartCount();
    }
}

// Remoção de produtos
function removeProduct(event) {
    const cartItem = event.target.closest(".cart-item");
    cartItem.remove();

    updateTotal();
    updateCartCount();
    checkIfCartIsEmpty();
}

// Contador Carrinho
function updateCartCount() {
    let cartItems = document.getElementsByClassName("cart-item");
    let totalItems = 0;
    if (cartItems.length === 0) {
        document.getElementById("cart-count").style.display = "none";
    } else {
        for (let i = 0; i < cartItems.length; i++) {
            let quantity = parseInt(cartItems[i].getElementsByClassName("product-quantity")[0].value);
            totalItems += quantity;
        }
        document.getElementById("cart-count").style.display = "inline-block";
    }
    document.getElementById("cart-count").innerText = totalItems;
    document.querySelector(".cart-countTotal").innerText = totalItems;
}

// Remoção de produtos (validação carrinho vazio para aparecer mensagem)
function checkIfCartIsEmpty() {
    const cartItems = document.getElementsByClassName("cart-item");
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    const emptyCartMessage2 = document.querySelector(".empty-cart-message2");
    const cartContainer = document.querySelector(".cart-itens");

    if (cartItems.length === 0) {
        emptyCartMessage.style.display = "block";
        emptyCartMessage2.style.display = "block";
        cartContainer.classList.add("empty-cart");
    } else {
        emptyCartMessage.style.display = "none";
        emptyCartMessage2.style.display = "none";
        cartContainer.classList.remove("empty-cart");
    }
}

// Cálculo do preço total
function updateTotal() {
    totalAmount = 0;
    const cartProducts = document.getElementsByClassName("cart-item");
    for (var i = 0; i < cartProducts.length; i++) {
        const productPrice = parseFloat(cartProducts[i].getElementsByClassName("cart-item-price")[0].innerText.replace("R$", "").replace(",", "."));
        const productQuantity = cartProducts[i].getElementsByClassName("product-quantity")[0].value;
        totalAmount += productPrice * productQuantity;
    }

    totalAmount = totalAmount.toFixed(2);
    totalAmount = totalAmount.replace(".", ",");
    document.querySelector(".total strong").innerText = "R$" + totalAmount;
    document.querySelector("#total-value").innerText = "R$" + totalAmount;
}

// Array para armazenar os itens do carrinho
let cartItems = [];


// Função para atualizar a quantidade do item
function updateQuantity(index, change) {
    if (cartItems[index]) {
        // Atualiza a quantidade no array cartItems
        cartItems[index].quantity = (cartItems[index].quantity || 1) + change;

        // Evita que a quantidade fique negativa
        if (cartItems[index].quantity < 1) {
            cartItems[index].quantity = 1;
        }

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
        const productName = productInfo.querySelector('.product-name, .nome-produto, .tittle-p').textContent; // Nome do produto
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

        // Exibe mensagem de produto adicionado com imagem e nome
        showAddedMessage(productName, productImage);
    });
});


// Função para mostrar mensagem de produto adicionado
function showAddedMessage(productName, productImage) {
    const message = document.createElement('section');
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

