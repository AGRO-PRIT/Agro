

const imagens = {
    image1: ["imagens/icon_user-consumidor.png", "imagens/icon_user_consumider(verde).png"],
    image2: ["imagens/icon_pedidos.png", "imagens/icon_pedidos(verde).png"],
    image3: ["imagens/icon_vendas.png", "imagens/icon_vendas(verde).png"],
    image4: ["imagens/icon_comentario.png", "imagens/icon_comentario(verde).png"],
    image5: ["imagens/icone_consumidor-config.png", "imagens/icone_consumidor-config(verde).png"],
    image6: ["imagens/icon_cartao.png", "imagens/icon_cartao(verde).png"],
    image7: ["imagens/icon_home.png", "imagens/icon_home(verde).png"]
};

// Função para trocar a imagem
function trocarImagem(imageId) {
    const img = document.getElementById(imageId);
    if (img) {
        const currentSrc = img.src.split('/').pop(); 
        if (currentSrc === imagens[imageId][0].split('/').pop()) {
            img.src = imagens[imageId][1]; 
        } else {
            img.src = imagens[imageId][0]; 
        }
    }
}

// Função para aplicar o estado ativo ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('ativo'); 
            const img = link.previousElementSibling; 
            trocarImagem(img.id);
        }
    });
});