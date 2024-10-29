console.log('TEST Array.prototype.shift');

console.log('CASE shift off first value in array')
var array1 = [1, 2, 3];
var firstElement = array1.shift();
console.log(array1);
// Expected output: Array [2, 3]
console.log(firstElement);
// Expected output: 1

console.log('CASE shift off first value in array');
var bool = [true, false, false];
var boolean = array1.shift();
console.log(bool);
// Expected output: Array [false]
console.log(boolean);
// Expected output: true