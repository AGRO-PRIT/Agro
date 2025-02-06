const imagens = {
    image1: ["imagens/icon_user-consumidor.png", "imagens/icon_user_consumider(verde).png"],
    image2: ["imagens/icon_pedidos.png", "imagens/icon_pedidos(verde).png"],
    image3: ["imagens/icon_vendas.png", "imagens/icon_vendas(verde).png"],
    image4: ["imagens/icon_comentario.png", "imagens/icon_comentario(verde).png"],
    image5: ["imagens/icone_consumidor-config.png", "imagens/icone_consumidor-config(verde).png"],
    image6: ["imagens/icon_cartao.png", "imagens/icon_cartao(verde).png"],
    image7: ["imagens/icon_home.png", "imagens/icon_home(verde).png"]
};

function trocarImagem(imageId, hover) {
    const img = document.getElementById(imageId);
    if (img) {
        if (hover) {
            img.src = imagens[imageId][1]; 
        } else {
            img.src = imagens[imageId][0]; 
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        const img = link.previousElementSibling;

        if (link.getAttribute('href') === currentPath) {
            link.classList.add('ativo');
            trocarImagem(img.id, true);
        }

        const handleMouseOver = () => {
            trocarImagem(img.id, true);
            link.classList.add('hover'); 
        };
        const handleMouseOut = () => {
            if (!link.classList.contains('ativo')) {
                trocarImagem(img.id, false);
                link.classList.remove('hover'); 
            }
        };

        img.addEventListener('mouseover', handleMouseOver);
        img.addEventListener('mouseout', handleMouseOut);
        link.addEventListener('mouseover', handleMouseOver);
        link.addEventListener('mouseout', handleMouseOut);

        link.addEventListener('click', function() {
            menuLinks.forEach(l => {
                l.classList.remove('ativo');
                trocarImagem(l.previousElementSibling.id, false);
            });
            link.classList.add('ativo');
            trocarImagem(img.id, true);
        });
    });
});