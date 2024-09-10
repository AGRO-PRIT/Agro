
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}


function ready(){
        const removeProductButtons = document.getElementsByClassName("excluir")
        for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct)
    }

    const quantityinputs = document.getElementsByClassName("product-quantity")
    for (var i = 0; i < quantityinputs.length; i++) {
        quantityinputs[i].addEventListener("change", updateTotal)
    }

    const addToCartButtons = document.getElementsByClassName("add-to-cart")
    for (var i = 0; i < addToCartButtons.length; i++){
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }
}

function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("product-name")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText
    
    let newCartProduct = document.createElement("section")
    newCartProduct.classList.add("carousel-item")

    newCartProduct.innerHTML = 
    `
    <img src="${productImage}" alt="${productTitle}" class="product-image">
                <article class="product-info">
                    <h3 class="product-name">${productTitle}</h3>
                    <p class="seller-name">NomedoVendedor</p>
                    <p class="product-price">${productPrice}</p>
                    <button class="add-to-cart"> ADICIONAR </button>
                </article>
    `

   const tableBody = document.querySelector("carousel")
   tableBody.append(newCartProduct)
   updateTotal()
}

function removeProduct(event){
    event.target.parentElement.parentElement.parentElement.remove()
    updateTotal()
}


function updateTotal() {
    let totalAmount = 0
    const cartProducts = document.getElementsByClassName("cart-item")
    for (var i = 0; i < cartProducts.length; i++) {  
        const productPrice = cartProducts[i].getElementsByClassName("cart-item-price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("product-quantity")[0].value

        totalAmount  += productPrice * productQuantity
    }
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".total strong").innerText = "R$" + totalAmount   
}

