var Raid = function () {
    this.length = 0;  // Cantidad de valores en la lista
}

Raid.prototype.enPosicion = function (posicion) {
    var valor = this[posicion];
    return valor;
}

Raid.prototype.eliminarUltimo = function () {
    if (this.length > 0) {
        var valor = this[this.length - 1];  // Obtiene el último valor
        delete this[this.length - 1];       // Elimina el último valor
        this.length--;                      // Reduce la cantidad de elementos
        return valor;                       // Devuelve el valor eliminado
    }
    return undefined;  // Si no hay valores en la lista, devuelve undefined
}

console.log('TEST Raid.prototype.eliminarUltimo');

var numeros = new Raid();
numeros[0] = 100;
numeros[1] = 200;
numeros[2] = 300;
numeros[3] = 400;
numeros.length = 4;

console.log('Antes de eliminar el último valor:', numeros);

var valorEliminado = numeros.eliminarUltimo();  // Elimina el último valor

console.log('Después de eliminar el último valor:', numeros);
console.log('Valor eliminado:', valorEliminado);
//400
