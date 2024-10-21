var reversePalabras = function(palabras) {
    var i = 0;
    var j = palabras.length - 1;

    // Intercambiamos los elementos desde ambos extremos hacia el centro
    while (i < j) {
        var temp = palabras[i];        // Guardamos el elemento en la posición i
        palabras[i] = palabras[j];     // Asignamos el elemento de la posición j a la posición i
        palabras[j] = temp;            // Asignamos el elemento guardado a la posición j
        i++;
        j--;
    }
};

var palabras = {
    0: 'la',
    1: 'le',
    2: 'li',
    3: 'lo',
    4: 'lu',
    length: 5 
};

console.log("Palabras antes de invertir: ", palabras);

reversePalabras(palabras); // Invertimos el orden de las palabras
console.log("Palabras después de invertir: ", palabras);

console.log(indexOf(palabras, 'lo'));   // Result : 1 (nuevo índice de 'lo' tras el reverse)