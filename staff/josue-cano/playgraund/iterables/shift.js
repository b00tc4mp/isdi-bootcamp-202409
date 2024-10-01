// Función 'shift'
var shiftPalabras = function(palabras) {
    if (palabras.length === 0) {
        return undefined; // Si no hay elementos, no hacemos nada
    }
    
    var primerElemento = palabras[0]; // Guardamos el primer elemento
    // Desplazamos todos los elementos hacia adelante
    for (var i = 0; i < palabras.length - 1; i++) {
        palabras[i] = palabras[i + 1];
    }
    delete palabras[palabras.length - 1]; // Eliminamos el último elemento
    palabras.length--; // Decrementamos la longitud del objeto
    return primerElemento; // Devolvemos el primer elemento eliminado
};

// Objeto array de palabras
var palabras = {
    0: 'la',
    1: 'le',
    2: 'li',
    3: 'lo',
    4: 'lu',
    length: 5 
};

console.log("Palabras antes de shift: ", palabras);

var eliminado = shiftPalabras(palabras); // Elimino el primer elemento
console.log("Palabra eliminada: ", eliminado);
console.log("Palabras después de shift: ", palabras);
