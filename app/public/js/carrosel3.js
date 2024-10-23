const preBTN = document.querySelector('.PREV3');
const nexBtn = document.querySelector('.NEXT3');
const productContainer = document.querySelector('.todos-produtos');

// Definir o índice inicial e o número de itens visíveis
let currentIndex = 0;
const itemWidth = 190; // Largura de cada item incluindo margem
const itemsToShow = 4; // Quantidade de itens visíveis no carrossel
const totalItems = document.querySelectorAll('.box-produto').length;
const maxIndex = Math.ceil(totalItems / itemsToShow) - 1; // Número máximo de páginas

// Função para mover o carrossel para a direita
nexBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        productContainer.style.transform = `translateX(-${currentIndex * (itemWidth * itemsToShow)}px)`;
    }
});

// Função para mover o carrossel para a esquerda
preBTN.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        productContainer.style.transform = `translateX(-${currentIndex * (itemWidth * itemsToShow)}px)`;
    }
});
