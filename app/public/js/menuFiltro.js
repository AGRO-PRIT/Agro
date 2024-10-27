function menuFiltro() {
    let menuMobile = document.querySelector('.mobile-filter');
    
    if (menuMobile.classList.contains('openF')) {
        menuMobile.classList.remove('openF');
    } else{
        menuMobile.classList.add('openF')
    }
}