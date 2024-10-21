
function hola(nombre){
    alert("hola "+ nombre);
    
};

function main(){
hola("Pepito");
var tiempo = 5
recordar("han pasado "+ tiempo,tiempo)
contar(1);
};

function recordar(mensaje,tiempo){
setTimeout(()=>{alert(mensaje)},tiempo * 1000)
}

function contar(tiempo){
    const contador = document.getElementById("contador");
    let valor = 0;
    const intervalo = setInterval(()=>{contador.innerText= valor
        valor = valor + 1
    },tiempo * 1000);
    setTimeout(()=>{clearInterval(intervalo)}, 10000)
   
}
document.addEventListener("DOMContentLoaded",main);