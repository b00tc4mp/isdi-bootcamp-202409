console.log("TEST Array.prototype.slice");

console.log("CASE copy the array from index 2");

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2))
// (3) ['camel', 'duck', 'elephant']

console.log("CASE copy from index 2 to 4");

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2, 4));
// (2) ['camel', 'duck']

console.log("CASE copy from index -2");

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(-2));
// (2) ['duck', 'elephant']

console.log("CASE copy from index 2 to index -1");

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2, -1));
// (2) ['camel', 'duck']

console.log("CASE copy without parameters");

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice());
// (5) ['ant', 'bison', 'camel', 'duck', 'elephant']