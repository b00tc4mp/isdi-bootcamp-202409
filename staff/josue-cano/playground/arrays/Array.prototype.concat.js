var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'j'];
var array3 = array1.concat(array2);
 console.log(array3);


 //-------------------profe----------------------
 console.log('TEST Array.prototype.concat')

console.log('CASE concat 2 arrays of characters')

var abc = ['a', 'b', 'c']
var def = ['d', 'e', 'f']
var abcdef = abc.concat(def)
console.log(abcdef)
// ['a', 'b', 'c', 'd', 'e', 'f']

console.log('CASE concat 3 arrays of characters')

var abc = ['a', 'b', 'c']
var def = ['d', 'e', 'f']
var ghi = ['g', 'h', 'i']
var abcdefghi = abc.concat(def, ghi)
console.log(abcdefghi)
// ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

console.log('CASE concat 4 arrays of characters')

var abc = ['a', 'b', 'c']
var def = ['d', 'e', 'f']
var ghi = ['g', 'h', 'i']
var jkl = ['j', 'k', 'l']
var abcdefghijkl = abc.concat(def, ghi, jkl)
console.log(abcdefghijkl)
// ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']