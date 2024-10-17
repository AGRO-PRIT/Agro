const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carousel = document.querySelector('.carousel');
let currentIndex = 0;

prevButton.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0); // Evita rolar acima do primeiro item
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, carousel.children.length - 1); // Evita rolar abaixo do último item
    updateCarousel();
});

function updateCarousel() {
    const itemHeight = carousel.children[0].offsetHeight;
    carousel.style.transform = `translateY(-${currentIndex * itemHeight}px)`;
}
