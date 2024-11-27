var concat = function(iterable1, iterable2) {
    var result = {};

    // Copiar el primer iterable
    for (var i = 0; i < iterable1.length; i++) {
        result[i] = iterable1[i];
    }

    // Copiar el segundo iterable, continuando donde quedó el primero
    for (var j = 0; j < iterable2.length; j++) {
        result[i] = iterable2[j];
        i++;
    }

    // Asignar la nueva longitud
    result.length = iterable1.length + iterable2.length;

    return result; // Devuelve el objeto combinado
};

console.log('Test Concat');

// Definimos dos objetos tipo array con la propiedad length
var coches1 = {
    0: 'Fiat',
    1: 'Ford',
    2: 'Chevrolet',
    length: 3
};

var coches2 = {
    0: 'Volkswagen',
    1: 'Toyota',
    length: 2
};

console.log('Caso 1: Concatenar dos objetos tipo array');
console.log(concat(coches1, coches2));
// Resultado esperado: 
// { 0: 'Fiat', 1: 'Ford', 2: 'Chevrolet', 3: 'Volkswagen', 4: 'Toyota', length: 5 }

console.log('Caso 2: Concatenar con un objeto vacío');
console.log(concat(coches1, {length: 0}));
// Resultado esperado: 
// { 0: 'Fiat', 1: 'Ford', 2: 'Chevrolet', length: 3 }