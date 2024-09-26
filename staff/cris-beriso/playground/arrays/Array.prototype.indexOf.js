console.log("Test Array.prototype.indexOf");

console.log("CASE get the index in the array");

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
var index = beasts.indexOf("bison");

console.log(index);
// Expected output: 1

// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4

console.log(beasts.indexOf('giraffe'));
// Expected output: -1

console.log("CASE get de index in the array");

var veggies = ["brocoli" , "cauliflower", "cabbage", "kale", "tomato"];
var index = veggies.indexOf("kale");

console.log (index);
// 3

console.log(veggies.indexOf("letuce"));
// -1

//Ejemplo con palabras:
var animals = ["pingu", "hormiga", "delfin", "tejon de la miel", "pingu"];
var pinguIndex = animals.indexOf("pingu", 1);
console.log(pinguIndex);
//Expected output: 4