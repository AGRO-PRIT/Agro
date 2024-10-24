
const prev3 = document.querySelector('.prev3');
const next3 = document.querySelector('.next3');
const productContainer = document.querySelector('.carousel-container3');

// Definir o índice inicial e o número de itens visíveis
let currentIndex3 = 0;
const itemWidth = 1250; // Largura de cada item incluindo margem
const itemsToShow = 1; // Quantidade de itens visíveis no carrossel
const totalItems = document.querySelectorAll('.carousel-item3').length;
const maxIndex = Math.ceil(totalItems / itemsToShow) - 1; // Número máximo de páginas

// Função para mover o carrossel para a direita
next3.addEventListener('click', () => {
    if (currentIndex3 < maxIndex) {
        currentIndex3++;
        productContainer.style.transform = `translateX(-${currentIndex3 * (itemWidth * itemsToShow)}px)`;
    } console.log("testeprev");
});

// Função para mover o carrossel para a esquerda
prev3.addEventListener('click', () => {
    if (currentIndex3 > 0) {
        currentIndex3--;
        productContainer.style.transform = `translateX(-${currentIndex3 * (itemWidth * itemsToShow)}px)`;
    } console.log("testeprev");
});
