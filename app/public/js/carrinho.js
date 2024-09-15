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
    updateTotal()
}
 
function addProductToCart(event) {  
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("product-name")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText
   
   
    let newCartProduct = document.createElement("article")
    newCartProduct.classList.add("cart-item")
 
    newCartProduct.innerHTML =
    `

        <img src="${productImage}" alt="${productTitle}">
    </article>
    <article class="details">
        <h3>${productTitle}</h3>
        <p class="vendor">NomedoVendedor</p>
        <article class="quantity">
            <button>-</button>
            <input type="number" class="product-quantity" value="1" min="1">
            <button>+</button>
        </article>
    </article>
    <article class="price">
        <h3 class="cart-item-price">${productPrice}</h3>
        <article class="remove">
            <img class="removimg" src="imagens/icon_lixeira.png" alt="icone de uma lixeira">  
            <i class="excluir">Excluir</i>
        </article>

    `
 
    const cart = document.querySelector(".cart-itens")
    cart.append(newCartProduct)
 
    // Adiciona eventos aos novos elementos
    newCartProduct.getElementsByClassName("excluir")[0].addEventListener("click", removeProduct)
    newCartProduct.getElementsByClassName("product-quantity")[0].addEventListener("change", updateTotal)
 
    updateTotal()
}
 
function removeProduct(event) {
    event.target.parentElement.parentElement.parentElement.remove()
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

}
 
 