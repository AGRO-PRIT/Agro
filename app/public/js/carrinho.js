if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}
 
function ready() {
    const removeProductButtons = document.getElementsByClassName("excluir")
    for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct)
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
    updateTotal()
    updateCartCount();
}
 
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
            return;
        }
    }


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

    

    // Adiciona eventos aos novos elementos
    newCartProduct.querySelector(".product-quantity").addEventListener("change", updateTotal)
    newCartProduct.querySelector(".excluir").addEventListener("click", removeProduct)
    newCartProduct.querySelector(".mais").addEventListener("click", increaseQuantity)
    newCartProduct.querySelector(".menos").addEventListener("click", decreaseQuantity)

    updateTotal()
}

function increaseQuantity(event) {
    let quantityInput = event.target.parentElement.querySelector(".product-quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotal();
}

function decreaseQuantity(event) {
    let quantityInput = event.target.parentElement.querySelector(".product-quantity");
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updateTotal();
    }
}

function removeProduct(event) {
    event.target.closest(".cart-item").remove()
    updateTotal()
}
 
function updateTotal() {
    let totalAmount = 0
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
    document.querySelector("#product-count").innerText = productCount

}
 
 