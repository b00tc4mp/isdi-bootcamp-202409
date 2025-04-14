console.log('TEST Array.prototype.fill')

console.log('CASE fill 0 from position 2 until position 4')

var numbers = [1, 2, 3, 4];

console.log(numbers.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

console.log('CASE fill 5 from position 1')

console.log(numbers.fill(5, 1));
// Expected output: Array [1, 5, 5, 5]

console.log('CASE fill 6 from position 0')

console.log(numbers.fill(6));
// Expected output: Array [6, 6, 6, 6]

