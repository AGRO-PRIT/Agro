const imagens = {
    image1: ["imagens/icon_user-consumidor.png", "imagens/icon_user_consumider(verde).png"],
    image2: ["imagens/icon_pedidos.png", "imagens/icon_pedidos(verde).png"],
    image3: ["imagens/icon_cartao.png", "imagens/icon_cartao(verde).png"],
    image4: ["imagens/icon_home.png", "imagens/icon_home(verde).png"],
    image5: ["imagens/icone_consumidor-config.png", "imagens/icone_consumidor-config(verde).png"]
};

// Função para alternar as imagens
function trocarImagem(imageId) {
    var img = document.getElementById(imageId);
    
    if (img) {
        var currentSrc = img.src.split('/').pop(); 
        
        if (currentSrc === imagens[imageId][0].split('/').pop()) {
            img.src = imagens[imageId][1]; 
        } else {
            img.src = imagens[imageId][0]; 
        }
    } 
}

// Função para trocar cor do link e imagem ao clicar
function trocarCorImagem(linkId, imageId) {

    // Remove a classe 'ativo' de todos os links e imagens

    document.querySelectorAll('.section-link').forEach(link => {
        link.classList.remove('ativo');
    });

    // Adiciona a classe 'ativo' ao link clicado
    const linkAtivo = document.getElementById(linkId);
    linkAtivo.classList.add('ativo');

    // Troca a imagem
    trocarImagem(imageId);
}