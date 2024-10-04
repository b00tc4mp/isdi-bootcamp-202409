var Raid = function () {
    this.length = 0;  // Cantidad de valores en la lista
}

Raid.prototype.enPosicion = function (posicion) {
    var valor = this[posicion];
    return valor;
}

Raid.prototype.agregar = function (valor) {
    this[this.length] = valor; // valor en la última posición
    this.length++; // Aumenta la cantidad de elementos
}

console.log('TEST Raid.prototype.agregar');

var numeros = new Raid();
numeros[0] = 100;
numeros[1] = 200;
numeros[2] = 300;
numeros.length = 3;

console.log('Antes de agregar:', numeros);

numeros.agregar(400);  //400 al final de la lista

console.log('Después de agregar:', numeros);

console.log('Valor en la posición 3:', numeros.enPosicion(3));
// 400
