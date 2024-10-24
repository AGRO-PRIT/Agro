const prevBtn3 = document.querySelector('.prev3');
const nextBtn3 = document.querySelector('.next3');
const productContainer = document.querySelector('.todos-produtos');

// Definir o índice inicial e o número de itens visíveis
let currentIndex3 = 0;
const itemWidth = 190; // Largura de cada item incluindo margem
const itemsToShow = 4; // Quantidade de itens visíveis no carrossel
const totalItems = document.querySelectorAll('.box-produto').length;
const maxIndex = Math.ceil(totalItems / itemsToShow) - 1; // Número máximo de páginas

// Função para mover o carrossel para a direita
nextBtn3.addEventListener('click', () => {
    if (currentIndex3 < maxIndex) {
        currentIndex3++;
        productContainer.style.transform = `translateX(-${currentIndex3 * (itemWidth * itemsToShow)}px)`;
    }
});

// Função para mover o carrossel para a esquerda
prevBtn3.addEventListener('click', () => {
    if (currentIndex3 > 0) {
        currentIndex3--;
        productContainer.style.transform = `translateX(-${currentIndex3 * (itemWidth * itemsToShow)}px)`;
    }
});
