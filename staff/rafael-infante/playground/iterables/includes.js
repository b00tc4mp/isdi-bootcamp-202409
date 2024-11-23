console.log('TEST iterables/includes')
// recorrer el objeto y si el searchElement coincide con alguno de los elementos
// de iterable devuelve true y si no false
var includes = function (iterable, searchElement) {
  for (var i = 0; i < iterable.length; i++) {
    if (iterable[i] === searchElement) return true
  }
  return false
}

console.log('CASE find number 2 in numbers')

var numbers = { 0: 1, 1: 2, 2: 3, length: 3 }
var result = includes(numbers, 2)
console.log(result) // Expected output: true

console.log('CASE find cat in pets')

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 }
var result1 = includes(pets, 'cat')
console.log(result1) // expected output: true

console.log('CASE find cow in pets')
var result2 = includes(pets, 'cow')
console.log(result2) // expected output: false