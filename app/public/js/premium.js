function selecionarPlano(sectionId, button) {
    // Remove a seleção de todas as seções e reseta os botões
    const allSections = document.querySelectorAll('.premiumV-Total');
    allSections.forEach(section => {
        section.classList.remove('selecionado');
        section.classList.add('nao-selecionado');
        
        const btn = section.querySelector('button');
        btn.classList.remove('button-premium1');
        btn.classList.add('button-premium');
        btn.textContent = 'ASSINAR';
    });

    // Remove opacidade e marca a nova seção como selecionada
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('nao-selecionado');
    selectedSection.classList.add('selecionado');

    // Muda o botão da seção selecionada para "SELECIONADO"
    button.classList.remove('button-premium');
    button.classList.add('button-premium1');
    button.textContent = 'SELECIONADO';
}

// Invoca a seleção inicial da primeira seção ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const firstButton = document.querySelector('#section-basic .button-premium1');
    selecionarPlano('section-basic', firstButton);
});
