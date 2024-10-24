const carousel = document.querySelector('.carousel, .carouselEvent');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let startX = 0;
let endX = 0;
const itemWidth = 150; // Tamanho do movimento em pixels

// Atualiza a posição do carrossel
function updateCarousel() {
    const offset = currentIndex * itemWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Move o carrossel para a direita
function moveNext() {
    if (currentIndex < indicators.length - 1) {
        currentIndex++;
    }
    updateCarousel();
}

// Move o carrossel para a esquerda
function movePrev() {
    if (currentIndex > 0) {
        currentIndex--;
    }
    updateCarousel();
}

// Ação ao clicar no botão "Próximo"
nextBtn.addEventListener('click', moveNext);

// Ação ao clicar no botão "Anterior"
prevBtn.addEventListener('click', movePrev);

// Ação ao clicar nos indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Função touch para manipulação do carrossel
function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
}

function handleTouchEnd() {
    const distance = startX - endX;

    // Se a distância do toque for significativa, mova o carrossel
    if (Math.abs(distance) > itemWidth) {
        if (distance > 0) { // Deslizar para a esquerda
            moveNext();
        } else { // Deslizar para a direita
            movePrev();
        }
    }

    // Reiniciar as variáveis de toque após o movimento
    startX = 0;
    endX = 0;
}

// Adiciona ouvintes de eventos de toque se a largura da tela for menor que 768px
if (window.innerWidth < 768) {
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);
}

// Atualiza o carrossel inicialmente
updateCarousel();
