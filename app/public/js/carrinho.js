const removeProductButtons = document.getElementsByClassName("excluir")
for (var i = 0; i < removeProductButtons.length; i++) {
    removeProductButtons[i].addEventListener("click", function(event) {
       event.target.parentElement.parentElement.remove()
    })
}


const cartProducts = document.getElementsByClassName("cart-item")
for(var i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i].getElementsByClassName("cart-item-price")[0].innerText
}