const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const itemWidthMobile = 200; // Width of each item for touch (mobile)
const itemWidthDesktop = 1550; // Width of each slide for desktop
let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let maxTranslateX;

// Calculate maxTranslateX dynamically
function calculateMaxTranslateX() {
    const totalItemsWidth = items.length * itemWidthMobile;
    const viewportWidth = window.innerWidth;
    maxTranslateX = Math.max(-2650, viewportWidth - totalItemsWidth);
}


// === Functions for Desktop ===
function updateCarouselDesktop() {
    if (currentIndex >= indicators.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = indicators.length - 1;
    }
    carousel.style.transform = `translateX(${-currentIndex * itemWidthDesktop}px)`;
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

// === Functions for Mobile (Touch) ===
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
    currentTranslate = prevTranslate + movementX;

    // Limites de movimento
    if (currentTranslate > 0) {
        currentTranslate = 0; // Limite ao início
    }
    
    // Garante que currentTranslate não passe de -2000px
    if (currentTranslate < -2650) {
        currentTranslate = -2650;
    }
    
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}


function handleTouchEnd() {
    isDragging = false;
    carousel.style.transition = 'transform 0.4s ease';
    
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -itemWidthMobile / 3) {
        currentIndex++;
    } else if (movedBy > itemWidthMobile / 3) {
        currentIndex--;
    }

    // Restringir currentIndex
    if (currentIndex >= items.length) {
        currentIndex = items.length - 1;
    } else if (currentIndex < 0) {
        currentIndex = 0;
    }

    // Snap to the nearest item
    currentTranslate = -currentIndex * itemWidthMobile;

    // Garante que currentTranslate não ultrapasse -2000px
    if (currentTranslate < -2650) {
        currentTranslate = -2650;
    }

    carousel.style.transform = `translateX(${currentTranslate}px)`;
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
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

// === Toggle between versions ===
function checkScreenSize() {
    calculateMaxTranslateX(); // Calcule maxTranslateX sempre que verificar o tamanho da tela
    if (window.innerWidth < 768) {
        enableTouchCarousel(); // Enable touch for mobile
        disableDesktopCarousel(); // Disable desktop version
    } else {
        disableTouchCarousel(); // Disable touch for desktop
        setupDesktopCarousel(); // Enable desktop version
    }
}

function disableDesktopCarousel() {
    nextBtn.removeEventListener('click', updateCarouselDesktop);
    prevBtn.removeEventListener('click', updateCarouselDesktop);
    indicators.forEach((indicator) => {
        indicator.removeEventListener('click', updateCarouselDesktop);
    });
}

// Check screen size on load and when resizing the window
window.addEventListener('resize', checkScreenSize);
checkScreenSize(); // Execute the check on startup

// Ensure all items are draggable even if not visible initially
items.forEach(item => {
    item.style.touchAction = 'pan-y';
});

// Ensure all items are considered for dragging
carousel.style.width = `${items.length * itemWidthMobile}px`;