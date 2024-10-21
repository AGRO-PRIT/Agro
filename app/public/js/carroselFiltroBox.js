const upButtonFiltro = document.querySelector('.carousel-controlFiltro.up');
const downButtonFiltro = document.querySelector('.carousel-controlFiltro.down');
const carouselFiltro = document.querySelector('.carouselFiltro');
let currentIndexFiltro = 0; // Índice inicial do carrossel
const itemsToShowFiltro = 3; // Quantidade de itens visíveis
const totalItemsFiltro = document.querySelectorAll('.carousel-itemFiltro').length; // Total de itens
const itemHeightFiltro = 150; // Altura de cada item no carrossel
const itemsPerClick = 3; // Quantidade de itens para mover por vez

// Função para mover o carrossel para cima
upButtonFiltro.addEventListener('click', () => {
    if (currentIndexFiltro > 0) {
        currentIndexFiltro = Math.max(currentIndexFiltro - itemsPerClick, 0); // Garante que não vá abaixo de 0
    } else {
        currentIndexFiltro = totalItemsFiltro - itemsToShowFiltro; // Volta para a última posição
    }
    updateCarouselPositionFiltro();
});

// Função para mover o carrossel para baixo
downButtonFiltro.addEventListener('click', () => {
    if (currentIndexFiltro < totalItemsFiltro - itemsToShowFiltro) {
        currentIndexFiltro = Math.min(currentIndexFiltro + itemsPerClick, totalItemsFiltro - itemsToShowFiltro); // Garante que não ultrapasse o limite
    } else {
        currentIndexFiltro = 0; // Volta para a primeira posição
    }
    updateCarouselPositionFiltro();
});

// Função que atualiza a posição do carrossel
function updateCarouselPositionFiltro() {
    const translateYValueFiltro = -currentIndexFiltro * itemHeightFiltro; // Calcula o valor de translação baseado no índice
    carouselFiltro.style.transform = `translateY(${translateYValueFiltro}px)`; // Aplica a translação vertical
}
