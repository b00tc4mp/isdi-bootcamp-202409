
var unshiftPalabras = function(palabras, nuevaPalabra) {
    // Desplazamos todos los elementos hacia atrás
    for (var i = palabras.length; i > 0; i--) {
        palabras[i] = palabras[i - 1];
    }
    palabras[0] = nuevaPalabra; // Asignamos la nueva palabra en la primera posición
    palabras.length++; // Incrementamos longitud
};

console.log('TEST unshift')

var palabras = {
    0: 'la',
    1: 'le',
    2: 'li',
    3: 'lo',
    4: 'lu',
    length: 5 
};

console.log("Palabras antes de unshift: ", palabras);

unshiftPalabras(palabras, 'nuevo'); // Agregamos 'nuevo' al inicio
console.log("Palabras después de unshift: ", palabras);