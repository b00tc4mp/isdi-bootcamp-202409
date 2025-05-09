console.log('TEST Array.prototype.shift')

console.log('CASE extract 1 from array1')

const array1 = [1, 2, 3, 4];

const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3, 4]

console.log(firstElement);
// Expected output: 1
