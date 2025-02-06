document.getElementById('toggleButton').addEventListener('click', function() {
    var secao = document.getElementById('Chat');
    var botao = document.getElementById('toggleButton');

    if (secao.classList.contains('hidden')) {
        secao.classList.remove('hidden');
        botao.textContent = 'X';
        botao.classList.add('close-chat-btn'); 
    } else {
        secao.classList.add('hidden');
        botao.textContent = 'Chat'; //
        botao.classList.remove('close-chat-btn'); 
    }
});
