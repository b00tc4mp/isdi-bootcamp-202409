console.log('TEST Array.prototype.unshift');

console.log('CASE adds element to beggining of array');
var array1 = [1, 2, 3];
console.log(array1.unshift(4, 5));
// Expected output: 5
console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]

console.log('CASE adds element to beggining of array');
var array2 = [false,false];
console.log(array2.unshift(true));
// Expected output: 5
console.log(array1);
// Expected output: Array [true, false,false]