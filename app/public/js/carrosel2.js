const carousel2 = document.querySelector('.carousel2');
const indicators2 = document.querySelectorAll('.indicator2');
const prevBtn2 = document.querySelector('.prev2');
const nextBtn2 = document.querySelector('.next2');

let currentIndex2 = 0;

function updateCarousel2() {
    carousel2.style.transform = `translateX(-${currentIndex2 * 1000}px)`;
    indicators2.forEach((indicator2, index) => {
        if (index === currentIndex2) {
            indicator2.classList.add('active');
        } else {
            indicator2.classList.remove('active');
        }
    });
}

nextBtn2.addEventListener('click', () => {
    currentIndex2 = (currentIndex2 + 1) % indicators2.length;
    updateCarousel2();
});

prevBtn2.addEventListener('click', () => {
    currentIndex2 = (currentIndex2 - 1 + indicators2.length) % indicators2.length;
    updateCarousel2();
});

indicators2.forEach((indicator2, index) => {
    indicator2.addEventListener('click', () => {
        currentIndex2 = index;
        updateCarousel2();
    });
});

updateCarousel2();
