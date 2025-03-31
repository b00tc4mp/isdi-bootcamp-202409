console.log('TEST Array.prototype.concat')

console.log('CASE concat 2 arrays')

var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var result1 = array1.concat(array2);

console.log(result1);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

console.log('CASE concat 3 arrays')
var array3 = ['g', 'h', 'i']
var result2 = array1.concat(array2, array3)
console.log(result2)
// Expected output: Array ["a", "b", "c", "d", "e", "f", "g", "h", "i"]