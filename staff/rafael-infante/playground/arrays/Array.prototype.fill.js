//The fill() method of Array instances changes 
//all elements 
//within a range of indices in an array 
//to a static value. It returns the modified array.

console.log("TEST Array.prototype.fill")

console.log("CASE replace values 3 and 4 with 0")
var numbers = [1, 2, 3, 4, 5];

console.log(numbers.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0, 5]

console.log("CASE replace values after 1 with 5")
// Fill with 5 from position 1
console.log(numbers.fill(5, 1));
// Expected output: Array [1, 5, 5, 5, 5]

console.log("CASE replace all values with 6")
console.log(numbers.fill(6));
// Expected output: Array [6, 6, 6, 6, 6]