console.log('Test array.prototype.shift')

console.log('CASE  removes the first element from an array1')

const array1 = [10, 25, 3];

const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [25, 3]

console.log(firstElement);
// Expected output: 10
