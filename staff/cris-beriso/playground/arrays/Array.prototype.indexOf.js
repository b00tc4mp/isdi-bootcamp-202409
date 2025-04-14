console.log("Test Array.prototype.indexOf");

console.log("CASE get the index of bison in the array");

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
var index = beasts.indexOf("bison");

console.log(index);
// 1

console.log("CASE get the index of bison start finding from index 2")

console.log(beasts.indexOf('bison', 2));
// 4

console.log("CASE get the index of giraffe")
console.log(beasts.indexOf('giraffe'));
// -1

console.log("CASE get the index of kale");

var veggies = ["brocoli", "cauliflower", "cabbage", "kale", "tomato"];
var index = veggies.indexOf("kale");

console.log(index);
// 3

console.log("CASE letuce element not found")
console.log(veggies.indexOf("letuce"));
// -1

console.log("CASE let's try it with words")
var animals = ["pingu", "hormiga", "delfin", "tejon de la miel", "pingu"];
var pinguIndex = animals.indexOf("pingu", 1);
console.log(pinguIndex);
// 4