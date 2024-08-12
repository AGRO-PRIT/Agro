
/*Slider JS*/

    let slideIndex = 0;

    /*funçao para exibir o slide*/

    function showSlides() {
    const slides = document.querySelectorAll('.slide');
    slideIndex++;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    /*movimento dos slides*/
    const offset = slideIndex * -100;
    document.querySelector('.slides').style.transform = `translateX(-${slideIndex * 100}%)`;

    /* Looping a cada 3 segundos */

    setTimeout(showSlides, 3000);
}

/*inicialização dos slides*/
    showSlides();
