

const array1 = [1, 2, 3, 4, 5]; // el unshift lo quer hace es devolverte la length del new array, los parametros que pongas en el unshift irian delante

var length = array1.unshift(3,2)
console.log(length)
// Expected output: 7

console.log(array1);
// Expected output: Array [3,2,1,2,3,4,5]

const array2 = [1,2,3]
var length = array2.unshift(1)

console.log(length) // 4
console.log(array2) // [1,1,2,3]