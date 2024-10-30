console.log('TEST array prototype .concat')

console.log('CASE merge one array to another using concat')
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3 = array1.concat(array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

console.log('CASE merge two arrays to antoher using concat')
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3 = ['g', 'h', 'i']
var array4 = array1.concat(array2, array3)
//Expected output: Array ["a", "b", "c", "d", "e", "f", 'g', 'h', 'i']