//Indexof sirve para buscar un elemento en un array y devuelve su indice
console.log('TEST Array.prototype.Indexof()');

// Caso 1:

var coches = ['Seat Ibiza', 'Ford Focus', 'BMW X5'];
console.log("Caso 1 Elemento encontrado en el array");

console.log(coches.indexOf('Seat Ibiza', 1)); //0 (el primer elemento coincide)

// Caso 2: Elemento no encontrado
console.log("caso 2 Elemento no encontrado");
console.log(coches.indexOf('Tesla Model S')); //-1 (el elemento no está en el array)