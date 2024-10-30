console.log('TEST Array.prototype.shift')

console.log('CASE removes the first element from an array')

//The shift() method of Array instances removes the first element from an array and returns that removed element. This method changes the length of the array

var array1 = [1, 2, 3];

var firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1