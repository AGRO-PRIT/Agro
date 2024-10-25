const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const itemWidthMobile = 200; // Largura de cada item para toque (mobile)
const itemWidthDesktop = 1550; // Largura de cada slide para desktop
const maxTranslateX = -(items.length * itemWidthMobile - window.innerWidth); // Ajusta o limite máximo de movimento

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

// === Funções para Desktop ===

function updateCarouselDesktop() {
    if (currentIndex >= indicators.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = indicators.length - 1;
    }
    carousel.style.transform = `translateX(-${currentIndex * itemWidthDesktop}px)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function setupDesktopCarousel() {
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarouselDesktop();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarouselDesktop();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarouselDesktop();
        });
    });

    updateCarouselDesktop();
}

// === Funções para Mobile (Touch) ===

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    isDragging = true;
    prevTranslate = currentTranslate;
    carousel.style.transition = 'none';
}

function handleTouchMove(event) {
    if (!isDragging) return;
    const currentX = event.touches[0].clientX;
    const movementX = currentX - startX;
    currentTranslate = prevTranslate + movementX * 0.7;

    // Limita o movimento dentro dos limites do container
    if (currentTranslate > 0) {
        currentTranslate = 0; // Limite no primeiro item
    } else if (currentTranslate < maxTranslateX) {
        currentTranslate = maxTranslateX; // Limite no último item
    }

    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function handleTouchEnd() {
    isDragging = false;
    carousel.style.transition = 'transform 0.4s ease';
}

function enableTouchCarousel() {
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);
}

function disableTouchCarousel() {
    carousel.removeEventListener('touchstart', handleTouchStart);
    carousel.removeEventListener('touchmove', handleTouchMove);
    carousel.removeEventListener('touchend', handleTouchEnd);
}

// === Alternância entre as versões ===

function checkScreenSize() {
    if (window.innerWidth < 768) {
        enableTouchCarousel(); // Habilita o toque em mobile
        disableDesktopCarousel(); // Desabilita a versão desktop
    } else {
        disableTouchCarousel(); // Desabilita o toque em desktop
        setupDesktopCarousel(); // Habilita a versão desktop
    }
}

function disableDesktopCarousel() {
    nextBtn.removeEventListener('click', () => {});
    prevBtn.removeEventListener('click', () => {});
    indicators.forEach((indicator) => {
        indicator.removeEventListener('click', () => {});
    });
}

// Verifica o tamanho da tela ao carregar e ao redimensionar a janela
window.addEventListener('resize', checkScreenSize);
checkScreenSize(); // Executa a verificação ao iniciar
