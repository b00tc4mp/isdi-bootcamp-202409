console.log('TEST iterables/indexOf')

// Recibo un array y un elemento
// Si el elemento es igual a alguno de los elementos devuelvo el indice de ese elemento
// Si no son iguales devuelvo -1
// hay que recorrer cada elemento del iterable
// si el elemento recorrido coincide con el pattern devolvemos el indice de ese elemento que hemos recorrido
// si existe el argumento fromIndex, comenzar la busqueda a partir de dicho indice

var lastIndexOf = function (iterable, pattern, fromIndex) {
  var found = 0;

  if (!fromIndex) {
    fromIndex = iterable.length - 1;
  }
  if (fromIndex < 0) {
    fromIndex = iterable.length + fromIndex
  }

  for (var i = fromIndex; i >= 0; i--) {
    if (iterable[i] === pattern) {
      found = i;
      return found
    } else {
      found = -1
    }
  }

  return found
}

console.log('CASE show index of "8" in "numbers"')
var numbers = {
  0: 2,
  1: 4,
  2: 1,
  3: 8,
  4: 7,
  5: 39,
  6: 8,
  length: 7
}
var index = lastIndexOf(numbers, 8)
console.log(index) // expected output: 6

console.log('CASE show index of "20" in "numbers"')

var index2 = lastIndexOf(numbers, 20)
console.log(index2) // expected output: -1

console.log('CASE show index of "8" in "numbers" from index 4')
var index3 = lastIndexOf(numbers, 8, 4) // expected output 3
console.log(index3)

console.log('CASE show index of "8" in "numbers" from index -2')
var index4 = lastIndexOf(numbers, 8, -2) // expected output 3
console.log(index4)

console.log('CASE show index of "8" in "numbers" from index -1')
var index5 = lastIndexOf(numbers, 8, -1) // expected output 6
console.log(index5)
