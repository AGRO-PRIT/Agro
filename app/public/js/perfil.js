function mostrarSeção(seção, linkClicado) {

    // Esconde todas as seções
    document.querySelectorAll('.page-container > section').forEach(sec => {
        sec.style.display = 'none';
    });

    // Remove a cor marrom de todos os links
    document.querySelectorAll('.section-link').forEach(link => {
        link.style.color = 'green';
    });

    // Mostra a seção selecionada
    document.getElementById(seção).style.display = 'block';

    // Adiciona a cor marrom ao link clicado
    linkClicado.style.color = 'brown';
}

function mostrarSeção2(seção, linkClicado) {
    // Esconde todas as seções
    document.querySelectorAll('.container-pedidos > section').forEach(sec => {
        sec.style.display = 'none';
    });

    // Remove a cor marrom de todos os links
    document.querySelectorAll('.section-link').forEach(link => {
        link.style.color = '';
    });

    // Mostra a seção selecionada
    document.getElementById(seção).style.display = 'block';

    // Adiciona a cor marrom ao link clicado
    linkClicado.style.color = 'brown';
}