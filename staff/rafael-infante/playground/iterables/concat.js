console.log('TEST iterables/concat')
// recibo mas de un array y debo incluir todos los elementos en un solo array
// devuelve un nuevo array con todos los elementos incluidos
var concat = function (arr1, arr2) {
  var newArray = { length: 0 }
  if (arguments.length === 2) {
    for (var i = 0; i < arr2.length; i++) {
      arr1[arr1.length] = arr2[i];
      arr1.length++
    }
    newArray[newArray.length] = arr1;
    newArray.length++
  }
  return newArray
}

console.log('CASE concat 2 arrays')
var array1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var array2 = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var array3 = concat(array1, array2)
console.log(array3) // Expected output: {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6}

console.log('CASE concat 3 arrays')

