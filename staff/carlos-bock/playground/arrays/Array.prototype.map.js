
console.log('TEST Array.prototype.map');

console.log('CASE multiply each by 2')
var array1 = [1, 4, 9, 16];
var map1 = array1.map((x) => x * 2);
console.log(map1);
// Expected output: Array [2, 8, 18, 32]

console.log('CASE multiply each by 3')
var array1 = [2, 8, 9, 10];
var map1 = array1.map((x) => x * 3);
console.log(map1);
// Expected output: Array [6, 24, 27, 30]