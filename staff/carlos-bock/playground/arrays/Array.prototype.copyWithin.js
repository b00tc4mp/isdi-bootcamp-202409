
console.log('TEST Array.prototype.copyWithin');

console.log('CASE copyWithin one arrays of characters');
var array1 = ['a', 'b', 'c', 'd', 'e'];
console.log(array1.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

console.log('CASE copyWithin two arrays of characters');
var array2 = ["d", "b", "c", "d", "e"];
console.log(array1.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]
