var temp = 1;

function Girar() {
    document.getElementById('slide' + temp).checked = false;
    temp += 1;
    if (temp > 3) { // Altere este número para o total de slides que você tem
        temp = 1;
    }
    document.getElementById('slide' + temp).checked = true;
}

// Iniciar o carrossel imediatamente
setInterval(Girar, 3000); // Avança para o próximo slide a cada 3 segundos
