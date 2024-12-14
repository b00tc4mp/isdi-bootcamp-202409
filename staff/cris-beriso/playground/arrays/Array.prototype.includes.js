console.log("TEST Array.prototype.includes")

console.log("CASE find number 2 in numbers")

var numbers = [1, 2, 3];
console.log(numbers.includes(2));
// True

console.log("CASE find cat in pets");

var pets = ["cat", "dog", "bat"];
console.log(pets.includes("cat"));
// True

console.log("CASE find cow in pets")

var pets = ["cat", "dog", "bat"];
console.log(pets.includes("cow"));
// False
