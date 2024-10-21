
// Carrossel Box JS
const pages = document.querySelectorAll('.pagina');
const prevButtonBox = document.querySelector('.carousel-control.prev');
const nextButtonBox = document.querySelector('.carousel-control.next');
const indicatorsBox = document.querySelectorAll('.indicator');
let currentPageBox = 0;

pages[currentPageBox].classList.add('active');
indicatorsBox[currentPageBox].classList.add('active');

function showPageBox(indexBox) {
    pages[currentPageBox].classList.remove('active');
    indicatorsBox[currentPageBox].classList.remove('active');
    pages[currentPageBox].classList.add('prev');

    currentPageBox = indexBox;

    pages[currentPageBox].classList.add('active');
    indicatorsBox[currentPageBox].classList.add('active');

    setTimeout(() => {
        pages.forEach(page => page.classList.remove('prev'));
    }, 600);
}

prevButtonBox.addEventListener('click', () => {
    const prevPageBox = (currentPageBox - 1 + pages.length) % pages.length;
    showPageBox(prevPageBox);
});

nextButtonBox.addEventListener('click', () => {
    const nextPageBox = (currentPageBox + 1) % pages.length;
    showPageBox(nextPageBox);
});

indicatorsBox.forEach((indicator, indexBox) => {
    indicator.addEventListener('click', () => {
        showPageBox(indexBox);
    });
});