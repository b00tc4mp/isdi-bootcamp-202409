console.log('TEST Array.prototype.concat')

console.log('CASE fusion 2 arrays')

//The concat() method of Array instances is used to merge two or more arrays

var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3 = array1.concat(array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]