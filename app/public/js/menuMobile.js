function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
    } else {
        menuMobile.classList.add('open');
    }
}

function toggleSubmenu(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    const parentLi = event.currentTarget.parentElement; // Obtém o elemento pai (li)
    
    // Fecha todas as subcategorias
    const allSubmenus = document.querySelectorAll('.submenu');
    allSubmenus.forEach(submenu => {
        submenu.parentElement.classList.remove('expanded');
    });

    // Alterna a classe 'expanded' apenas para a subcategoria correspondente
    parentLi.classList.toggle('expanded');
}
