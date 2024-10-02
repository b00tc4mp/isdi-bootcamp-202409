console.log("TEST Array.prototype.filter");


//El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.

console.log("CASE filter the elements with more than 6 letters of on the array");
console.log('-------------------------------------------------');

var palabras = ['pelo', 'oreja', 'nariz', 'piernas', 'brazos', 'cabeza', 'hombros', 'rodillas'];

var resultado = palabras.filter((palabra) => palabra.length > 6);
// Devolverá 'piernas', 'hombros', 'rodillas'

console.log(resultado);
// Expected output: Array ["exuberant", "destruction", "present"]
