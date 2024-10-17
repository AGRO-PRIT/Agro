document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".todos-produtos");
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");
    const indicators = document.querySelectorAll(".indicator");
    
    let currentIndex = 0;
    const itemsPerPage = 4; // Número de itens a serem exibidos por vez
    const itemWidth = 200; // Largura de cada item (ajuste conforme necessário)
    const totalItems = document.querySelectorAll(".box-produto").length;
    const slideWidth = 1000; // Largura do deslocamento por clique

    function updateCarousel() {
        // Calcula o deslocamento baseado no índice atual
        const offset = -currentIndex * slideWidth;
        container.style.transform = `translateX(${offset}px)`;

        // Atualiza a classe ativa dos indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentIndex);
        });
    }

    nextButton.addEventListener("click", () => {
        // Avança apenas até o terceiro dot
        if (currentIndex < 2) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta ao início
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        // Retrocede e, se estiver no primeiro, vai para o terceiro dot
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = 2; // Vai para o terceiro dot
        }
        updateCarousel();
    });

    indicators.forEach((indicator, index) => {
        indicator.dataset.index = index; // Define um índice para cada indicador
        indicator.addEventListener("click", (event) => {
            currentIndex = parseInt(event.target.dataset.index);
            updateCarousel();
        });
    });

    // Inicializa o carrossel
    updateCarousel();
});
