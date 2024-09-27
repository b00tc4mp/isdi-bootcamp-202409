console.log('TEST iterables/concat')
// recibo mas de un array y debo incluir todos los elementos en un solo array
// devuelve un nuevo array con todos los elementos incluidos
var concat = function (arr1, arr2) {
  var newArray = []
  if (arguments.length === 1) {
    newArray = arr1
    return newArray
  }
  if (arguments.length >= 2) {
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        newArray[newArray.length] = arguments[i][j]
      }
    }
    return newArray
  }
}
var array1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var array2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var array3 = { 0: 'g', 1: 'h', 2: 'i', length: 3 }
var array4 = { 0: 'g', 1: 'h', 2: 'i', length: 3 }

console.log('CASE concat 1 array')
var result = concat(array1)
console.log(result) // Expected output { 0: 'a', 1: 'b', 2: 'c', length: 3 }

console.log('CASE concat 2 arrays')
var result2 = concat(array1, array2)
console.log(result2) // expected output { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }