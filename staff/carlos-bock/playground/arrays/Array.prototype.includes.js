console.log("TEST Array.prototype.includes")

console.log("CASE find number 2 in numbers")

var numbers = [1, 2, 3];
console.log(numbers.includes(2));
// Expected output: true

var pets = ['cat', 'dog', 'bat'];

console.log("CASE find cat in pets");
console.log(pets.includes('cat'));
// Expected output: true

console.log(pets.includes('cowcat'));
// Expected output: false

console.log(pets.includes('at'));
// Expected output: false
