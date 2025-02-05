document.getElementById('toggleButton').addEventListener('click', function() {
    var secao = document.getElementById('Chat');
    var botao = document.getElementById('toggleButton');

    if (secao.classList.contains('hidden')) {
        secao.classList.remove('hidden');
        botao.textContent = 'Fechar chat';
    } else {
        secao.classList.add('hidden');
        botao.textContent = 'Abrir chat';
    }
});
