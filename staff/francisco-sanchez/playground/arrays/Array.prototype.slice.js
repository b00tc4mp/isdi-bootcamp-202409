/*
The slice() method of Array instances returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.
*/


/**
 * Santaxis
 * arr.slice([inicio [, fin]])
 * 
 * 
 * * * inicio * * *
 * ----------------
Índice donde empieza la extracción. El primer elemento corresponde con el índice 0.

Si el índice especificado es negativo, indica un desplazamiento desde el final del array.slice(-2) extrae los dos últimos elementos del array

Si inicio es omitido el valor por defecto es 0.

Si inicio es mayor a la longitud del array, se devuelve un array vacío.

* * * fin * * *
---------------
Índice que marca el final de la extracción. slice extrae hasta, pero sin incluir el final.

slice(1,4) extrae desde el segundo elemento hasta el cuarto (los elementos con índices 1, 2, y 3).

Con un índice negativo, fin indica un desplazamiento desde el final de la secuencia. slice(2,-1) extrae desde el tercer hasta el penúltimo elemento en la secuencia.

Si fin es omitido, slice extrae hasta el final de la secuencia (arr.length).

Si fin es mayor a la longitud del array, slice extrae hasta el final de la secuencia (arr.length).

Valor de retorno
Un nuevo array con los valores extraídos.

 */

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
