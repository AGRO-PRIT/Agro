// Seleciona os elementos
const upButtonFiltro   = document.querySelector('.carousel-controlFiltro.up');
const downButtonFiltro = document.querySelector('.carousel-controlFiltro.down');
const carouselFiltro   = document.querySelector('.carouselFiltro');
const itemsFiltro      = document.querySelectorAll('.carousel-itemFiltro');

let currentIndexFiltro = 0;
const totalItemsFiltro = itemsFiltro.length;

// Captura dinamicamente a altura do item (garantindo que seja 250px conforme definido no CSS)
const itemHeightFiltro = itemsFiltro[0].offsetHeight;

// Botão "Up": Vai para o item anterior; se estiver no primeiro, vai para o último
upButtonFiltro.addEventListener('click', () => {
    if (currentIndexFiltro > 0) {
        currentIndexFiltro--;
    } else {
        currentIndexFiltro = totalItemsFiltro - 1;
    }
    updateCarouselPositionFiltro();
});

// Botão "Down": Vai para o próximo item; se estiver no último, volta para o primeiro
downButtonFiltro.addEventListener('click', () => {
    if (currentIndexFiltro < totalItemsFiltro - 1) {
        currentIndexFiltro++;
    } else {
        currentIndexFiltro = 0;
    }
    updateCarouselPositionFiltro();
});

// Atualiza a posição do carrossel com base no índice atual
function updateCarouselPositionFiltro() {
    const translateY = -currentIndexFiltro * itemHeightFiltro;
    carouselFiltro.style.transform = `translateY(${translateY}px)`;
    carouselFiltro.style.transition = "transform 0.5s ease-in-out";
}
