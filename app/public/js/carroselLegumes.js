const legumesCarouselContainer = document.querySelector('.carousel2');
const legumesItems = document.querySelectorAll('.carousel-item2');
const legumesIndicators = document.querySelectorAll('.indicator2');
const legumesPrevBtn = document.querySelector('.prev2');
const legumesNextBtn = document.querySelector('.next2');

const legumesItemWidthMobile = 200; // Largura de cada item para toque (mobile)
const legumesItemWidthDesktop = 1550; // Largura de cada slide para desktop

let legumesCurrentIndex = 0;
let legumesStartX = 0;
let legumesCurrentTranslate = 0;
let legumesPrevTranslate = 0;
let legumesIsDragging = false;
let legumesMaxTranslateX;

// Calcula maxTranslateX dinamicamente
function calculateLegumesMaxTranslateX() {
    const totalItemsWidth = legumesItems.length * legumesItemWidthMobile;
    const viewportWidth = window.innerWidth;
    legumesMaxTranslateX = Math.max(-2750, viewportWidth - totalItemsWidth); // Garante que não exceda -2000
}


// === Funções para Desktop ===

function updateLegumesCarouselDesktop() {
    if (legumesCurrentIndex >= legumesIndicators.length) {
        legumesCurrentIndex = 0; // Voltar ao primeiro indicador ao chegar no último
    } else if (legumesCurrentIndex < 0) {
        legumesCurrentIndex = legumesIndicators.length - 1; // Voltar ao último indicador ao ir para trás do primeiro
    }
    
    legumesCarouselContainer.style.transform = `translateX(${-legumesCurrentIndex * legumesItemWidthDesktop}px)`;
    
    legumesIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === legumesCurrentIndex);
    });
}

function setupLegumesDesktopCarousel() {
    legumesNextBtn.addEventListener('click', () => {
        legumesCurrentIndex++;
        updateLegumesCarouselDesktop();
    });

    legumesPrevBtn.addEventListener('click', () => {
        legumesCurrentIndex--;
        updateLegumesCarouselDesktop();
    });

    legumesIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            legumesCurrentIndex = index;
            updateLegumesCarouselDesktop();
        });
    });

    updateLegumesCarouselDesktop();
}

// === Funções para Mobile (Toque) ===

function handleLegumesTouchStart(event) {
    legumesStartX = event.touches[0].clientX;
    legumesIsDragging = true;
    legumesPrevTranslate = legumesCurrentTranslate;
    legumesCarouselContainer.style.transition = 'none';
}

function handleLegumesTouchMove(event) {
    if (!legumesIsDragging) return;
    const currentX = event.touches[0].clientX;
    const movementX = currentX - legumesStartX;
    legumesCurrentTranslate = legumesPrevTranslate + movementX;

    // Limita o movimento dentro dos limites do contêiner
    if (legumesCurrentTranslate > 0) {
        legumesCurrentTranslate = 0; // Limite no primeiro item
    } 
    if (legumesCurrentTranslate < -2750) {
        legumesCurrentTranslate = -2750; // Limite no último item
    }

    legumesCarouselContainer.style.transform = `translateX(${legumesCurrentTranslate}px)`;
}


function handleLegumesTouchEnd() {
    legumesIsDragging = false;
    legumesCarouselContainer.style.transition = 'transform 0.4s ease';

    const movedBy = legumesCurrentTranslate - legumesPrevTranslate;
    if (movedBy < -legumesItemWidthMobile / 3) {
        legumesCurrentIndex++; // Mover para o próximo item
    } else if (movedBy > legumesItemWidthMobile / 3) {
        legumesCurrentIndex--; // Mover para o item anterior
    }

    // Garantir que legumesCurrentIndex permaneça dentro dos limites
    if (legumesCurrentIndex >= legumesItems.length) {
        legumesCurrentIndex = legumesItems.length - 1;
    } else if (legumesCurrentIndex < 0) {
        legumesCurrentIndex = 0;
    }

    // Snap para o item mais próximo
    legumesCurrentTranslate = -legumesCurrentIndex * legumesItemWidthMobile;

    // Garante que não ultrapasse -2000px
    if (legumesCurrentTranslate < -2750) {
        legumesCurrentTranslate = -2750; 
    }

    legumesCarouselContainer.style.transform = `translateX(${legumesCurrentTranslate}px)`;

    // Atualiza os indicadores
    legumesIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === legumesCurrentIndex);
    });
}


function enableLegumesTouchCarousel() {
    legumesCarouselContainer.addEventListener('touchstart', handleLegumesTouchStart);
    legumesCarouselContainer.addEventListener('touchmove', handleLegumesTouchMove);
    legumesCarouselContainer.addEventListener('touchend', handleLegumesTouchEnd);
}

function disableLegumesTouchCarousel() {
    legumesCarouselContainer.removeEventListener('touchstart', handleLegumesTouchStart);
    legumesCarouselContainer.removeEventListener('touchmove', handleLegumesTouchMove);
    legumesCarouselContainer.removeEventListener('touchend', handleLegumesTouchEnd);
}

// === Alternar entre versões ===

function checkLegumesScreenSize() {
    calculateLegumesMaxTranslateX(); // Calcule maxTranslateX sempre que verificar o tamanho da tela
    if (window.innerWidth < 768) {
        enableLegumesTouchCarousel(); // Habilitar toque para mobile
        disableLegumesDesktopCarousel(); // Desabilitar versão desktop
    } else {
        disableLegumesTouchCarousel(); // Desabilitar toque para desktop
        setupLegumesDesktopCarousel(); // Habilitar versão desktop
    }
}

function disableLegumesDesktopCarousel() {
    legumesNextBtn.removeEventListener('click', updateLegumesCarouselDesktop);
    legumesPrevBtn.removeEventListener('click', updateLegumesCarouselDesktop);
    legumesIndicators.forEach((indicator) => {
        indicator.removeEventListener('click', updateLegumesCarouselDesktop);
    });
}

// Verifique o tamanho da tela na carga e ao redimensionar a janela
window.addEventListener('resize', checkLegumesScreenSize);
checkLegumesScreenSize(); // Execute a verificação na inicialização

// Ensure all items are draggable even if not visible initially
legumesItems.forEach(item => {
   item.style.touchAction = 'pan-y';
});

// Ensure all items are considered for dragging
legumesCarouselContainer.style.width = `${legumesItems.length * legumesItemWidthMobile}px`;
