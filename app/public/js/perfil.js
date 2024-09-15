function mostrarSeção(seção) {
    // Esconde todas as seções
    document.querySelectorAll('.page-container > section').forEach(sec => {
        sec.style.display = 'none';
    });

    // Mostra a seção selecionada
    document.getElementById(seção).style.display = 'block';
}

