document.addEventListener('DOMContentLoaded', function () {
    const btnBoxProntas = document.getElementById('btnBoxProntas');
    const btnProdutos = document.getElementById('btnProdutos');

    const filtroCarrosel = document.querySelector('#secaoProdutos > section:first-child');
    const suaBox = document.getElementById('suaBox');
    const boxEscolhida = document.getElementById('boxEscolhida');

    const carroselProdutos = document.getElementById('carroselBoxProdutos');
    const carroselBoxPronto = document.getElementById('carroselBoxPronto');

    btnBoxProntas.addEventListener('click', function () {
        filtroCarrosel.classList.add('ocultar');
        suaBox.style.display = 'none';
        boxEscolhida.style.display = 'block';
        carroselProdutos.style.display = 'none';
        carroselBoxPronto.style.display = 'block';

        atualizarCarrossel(carroselBoxPronto);
    });

    btnProdutos.addEventListener('click', function () {
        filtroCarrosel.classList.remove('ocultar');
        suaBox.style.display = 'block';
        boxEscolhida.style.display = 'none';
        carroselProdutos.style.display = 'block';
        carroselBoxPronto.style.display = 'none';

        atualizarCarrossel(carroselProdutos);
    });
});
