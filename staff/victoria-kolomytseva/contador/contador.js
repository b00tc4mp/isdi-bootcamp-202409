let contador = 0

document.querySelector("#btnSumar").addEventListener("click", sumarUno);
document.querySelector("#btnRestar").addEventListener("click", restarUno);



function sumarUno() {
    contador = contador + 1;
    document.querySelector("#msgContador").innerHTML = contador
}

function restarUno() {
    contador = contador - 1;
    document.querySelector("#msgContador").innerHTML = contador
}