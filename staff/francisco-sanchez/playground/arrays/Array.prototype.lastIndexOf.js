/*
The lastIndexOf() method of Array instances returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
*/

/**Devuelve el último indice en el que puede encontrarse un elemento determinado */

var alumnos = [
    "Lucía González",
    "Santiago Pérez",
    "Ana Martínez",
    "Carlos Ruiz",
    "Lucía González",
    "Javier Sánchez",
    "Laura García",
];

console.log(alumnos);

console.log('When we search for "Carlos Ruiz" we will obtain 3');
console.log(alumnos.lastIndexOf('Carlos Ruiz'));
// Expected output: 3

console.log('When we search for "Lucía González" we will obtain 4');
console.log(alumnos.lastIndexOf('Lucía González'));
// Expected output: 4
