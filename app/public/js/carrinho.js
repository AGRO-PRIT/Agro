if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

// variavel global para o valor total 

var totalAmount = "0,00"

// funcão carregamento de cada constante 

function ready() {
    const removeProductButtons = document.getElementsByClassName("excluir")
    for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct)
    }
    
    const removeImageButtons = document.getElementsByClassName("removimg");
    for (var i = 0; i < removeImageButtons.length; i++) {
        removeImageButtons[i].addEventListener("click", removeProduct);
    }

    const quantityInputs = document.getElementsByClassName("product-quantity")
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", updateTotal)
    }
 
    const addToCartButtons = document.getElementsByClassName("add-to-cart")
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }
    const increaseQuantityButtons = document.getElementsByClassName("mais");
    for (let i = 0; i < increaseQuantityButtons.length; i++) {
        increaseQuantityButtons[i].addEventListener("click", increaseQuantity);
    }

    const decreaseQuantityButtons = document.getElementsByClassName("menos");
    for (let i = 0; i < decreaseQuantityButtons.length; i++) {
        decreaseQuantityButtons[i].addEventListener("click", decreaseQuantity);
    }

    const purchaseButton = document.getElementsByClassName("checkout-button")[0]
    purchaseButton.addEventListener("click", makePurchase)

    updateTotal()
    updateCartCount();
}

// Mensagem ao Finalizar a compra + verifiçação de mensagem de carrinho vazio

function makePurchase(){
    if(totalAmount == "0,00"){
        alert("Seu carrinho está vazio!")
    } else{
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido: ${totalAmount}
            Volte sempre!
            `
        )
    }
}


// adicionar cada produto ao clicar em "adicionar" puxando informações da importação html

function addProductToCart(event) {  
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("product-name")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText.replace("R$ ", "R$")
   
    const productsCartName = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText == productTitle) {
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-quantity")[0].value++;
            updateTotal();
            updateCartCount();
            return;
        }
    }

//  importação do html imposto de cada item tal como pegar informação de cada produto para adicionar

    let newCartProduct = document.createElement("article")
    newCartProduct.classList.add("cart-item")
 
    newCartProduct.innerHTML =
    `

        <img src="${productImage}" alt="${productTitle}">
   
    <article class="details">
        <h3 class="cart-product-title">${productTitle}</h3>
        <p class="vendor">NomedoVendedor</p>
        <article class="quantity">
            <button class="menos">-</button>
            <input type="number" class="product-quantity" value="1" min="1"> 
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
    `
 
    const cart = document.querySelector(".cart-itens")
    cart.append(newCartProduct)

// chamar eventos 

    newCartProduct.querySelector(".product-quantity").addEventListener("change", updateTotal)
    newCartProduct.querySelector(".excluir").addEventListener("click", removeProduct)
    newCartProduct.querySelector(".mais").addEventListener("click", increaseQuantity)
    newCartProduct.querySelector(".menos").addEventListener("click", decreaseQuantity)
    checkIfCartIsEmpty();
    updateTotal()
}

// botão de mais funcionar e adicionar um item

function increaseQuantity(event) {
    let quantityInput = event.target.parentElement.querySelector(".product-quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotal();
}

// botão de menos funcionar e tirar um item

function decreaseQuantity(event) {
    let quantityInput = event.target.parentElement.querySelector(".product-quantity");
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updateTotal();
    }
}

// remoção de produtos 

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

    for (let i = 0; i < cartItems.length; i++) {
        let quantity = parseInt(cartItems[i].getElementsByClassName("product-quantity")[0].value);
        totalItems += quantity;
    }

    document.getElementById("cart-count").innerText = totalItems;
}

// remoção de produtos ( validação carrinho vazio para aparecer mensagem)

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

// calculo do preço total 

function updateTotal() {
   totalAmount = 0
    const cartProducts = document.getElementsByClassName("cart-item")
    for (var i = 0; i < cartProducts.length; i++) {  
        const productPrice = parseFloat(cartProducts[i].getElementsByClassName("cart-item-price")[0].innerText.replace("R$", "").replace(",", "."))
        const productQuantity = cartProducts[i].getElementsByClassName("product-quantity")[0].value
 
        totalAmount += productPrice * productQuantity
        
    }
    
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".total strong").innerText = "R$" + totalAmount
    document.querySelector("#total-value").innerText = "R$" + totalAmount

    // tag para funcionar a quantidade de produtos totais
    // document.querySelector("#product-count").innerText = productCount

}
 
 