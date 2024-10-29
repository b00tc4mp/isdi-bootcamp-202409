
console.log('TEST Array.prototype.contact');

console.log('CASE concat one arrays of characters');
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3 = array1.concat(array2);
console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

console.log('CASE concat two arrays of characters');
var abc = ['a', 'b', 'c'];
var def = ['d', 'e', 'f'];
var ghi = ['g', 'h', 'i'];
var letters = abc.concat(def, ghi);
console.log(abcdefghi)
// ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']


//possible syntax
array1.concat()
array1.concat(value1)
array1.concat(value1, value2)
array1.concat(value1, value2, /* …, */ valueN)