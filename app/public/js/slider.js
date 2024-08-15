let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carrosel-itens');
    const dots = document.querySelectorAll('.dot');
    
    // Garantir que o índice esteja dentro dos limites
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    
    // Atualizar a posição do carrossel
    const offset = -currentIndex * 100; // 100% para cada slide
    document.querySelector('.').style.transform = `translateX(${offset}%)`;
    
    // Atualizar os pontos de navegação
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

// Inicializar o carrossel
showSlide(currentIndex);

// Adicionar eventos de clique aos pontos de navegação
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});