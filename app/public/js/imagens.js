const imagens = {
    link1: ["imagens/icon_user-consumidor.png", "imagens/icon_user_consumider(verde).png"],
    link2: ["imagens/icon_pedidos.png", "imagens/icon_pedidos(verde).png"],
    link3: ["imagens/icon_vendas.png", "imagens/icon_vendas(verde).png"],
    link4: ["imagens/icon_comentario.png", "imagens/icon_comentario(verde).png"],
    link5: ["imagens/icone_consumidor-config.png", "imagens/icone_consumidor-config(verde).png"],
    link6: ["imagens/icon_cartao.png", "imagens/icon_cartao(verde).png"],
    link7: ["imagens/icon_home.png", "imagens/icon_home(verde).png"]
};

function trocarImagem(linkId, hover) {
    const img = document.querySelector(`#${linkId} img`);
    if (img && imagens[linkId]) {
        img.src = hover ? imagens[linkId][1] : imagens[linkId][0];
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        const linkId = link.id;

        if (link.getAttribute('href') === currentPath) {
            link.classList.add('ativo');
            trocarImagem(linkId, true);
        }

        const handleMouseOver = () => {
            trocarImagem(linkId, true);
            link.classList.add('hover');
        };

        const handleMouseOut = () => {
            if (!link.classList.contains('ativo')) {
                trocarImagem(linkId, false);
                link.classList.remove('hover');
            }
        };

        link.addEventListener('mouseover', handleMouseOver);
        link.addEventListener('mouseout', handleMouseOut);

        link.addEventListener('click', function () {
            menuLinks.forEach(l => {
                l.classList.remove('ativo');
                trocarImagem(l.id, false);
            });
            link.classList.add('ativo');
            trocarImagem(linkId, true);
        });
    });
});
