const pages = document.querySelectorAll('.pagina');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const indicators = document.querySelectorAll('.indicator');
let currentPage = 0;

// Mostra a primeira página
pages[currentPage].classList.add('active');
indicators[currentPage].classList.add('active');

// Função para mudar de página
function showPage(index) {
    // Remove a classe 'active' da página e do indicador atual
    pages[currentPage].classList.remove('active');
    indicators[currentPage].classList.remove('active');

    // Atualiza o índice da página atual
    currentPage = index;

    // Adiciona a classe 'active' à nova página e indicador
    pages[currentPage].classList.add('active');
    indicators[currentPage].classList.add('active');
}

// Event listener para o botão "prev"
prevButton.addEventListener('click', () => {
    // Calcula a página anterior, voltando ao final se estiver na primeira
    const prevPage = (currentPage - 1 + pages.length) % pages.length;
    showPage(prevPage);
});

// Event listener para o botão "next"
nextButton.addEventListener('click', () => {
    // Calcula a próxima página, voltando ao início se estiver na última
    const nextPage = (currentPage + 1) % pages.length;
    showPage(nextPage);
});

// Event listeners para os indicadores (dots)
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showPage(index);
    });
});
