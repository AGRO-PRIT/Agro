const currentUrl = window.location.pathname;

// Checar qual link deve estar ativo com base na URL
if (currentUrl === '/') {
    document.getElementById('link-home').classList.add('active-link');
} else if (currentUrl === '/produtos') {
    document.getElementById('link-produtos').classList.add('active-link');
} else if (currentUrl === '/box') {
    document.getElementById('link-box').classList.add('active-link');
} else if (currentUrl === '/premium') {
    document.getElementById('link-premium').classList.add('active-link');
} else if (currentUrl === '/eventos') {
    document.getElementById('link-eventos').classList.add('active-link');
}


   
