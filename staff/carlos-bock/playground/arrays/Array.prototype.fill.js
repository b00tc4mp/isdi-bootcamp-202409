
console.log("TEST Array.prototype.fill")

console.log("CASE replace values 3 and 4 with 0")
var numbers = [1, 2, 3, 4, 5];

console.log(numbers.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0, 5]

console.log("CASE replace values afer 1 with 5")
console.log(numbers.fill(5, 1));
// Expected output: Array [1, 5, 5, 5, 5]

console.log("CASE replace all values with 6")
console.log(numbers.fill(6));
// Expected output: Array [6, 6, 6, 6, 6]
