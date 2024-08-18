const carousel3 = document.querySelector('.carousel-container3');
const indicators3 = document.querySelectorAll('.indicator3');
const prevBtn3 = document.querySelector('.prev3');
const nextBtn3 = document.querySelector('.next3');

let currentIndex3 = 0;

function updateCarousel3() {
    carousel3.style.transform = `translateX(-${currentIndex3 * 1695}px)`;
    indicators3.forEach((indicator3, index) => {
        if (index === currentIndex3) {
            indicator3.classList.add('active');
        } else {
            indicator3.classList.remove('active');  
        }
    });
}

nextBtn3.addEventListener('click', () => {
    currentIndex3 = (currentIndex3 + 1) % indicators3.length;
    updateCarousel3();
});

prevBtn3.addEventListener('click', () => {
    currentIndex3 = (currentIndex3 - 1 + indicators3.length) % indicators3.length;
    updateCarousel3();
});

indicators3.forEach((indicator3, index) => {
    indicator3.addEventListener('click', () => {
        currentIndex3 = index;
        updateCarousel3();
    });
});

updateCarousel3();
