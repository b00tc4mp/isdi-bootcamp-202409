console.log('TEST iterables/at')
var at = function (iterable, index) {
  var result;
  if (index >= 0) {
    index = Math.floor(index)
    result = iterable[index];
  } else {
    index = Math.ceil(index)
    result = iterable[iterable.length + index]
  }

  return result;
}

console.log('CASE show "perro" from "animals" ')
var animals = { 0: 'perro', 1: 'gato', 2: 'cabra', length: 3 }
var animal = at(arr, 0)
console.log(animal) // expected output: 'perro'

console.log('CASE show "cabra" from "animals" ')
var animals = { 0: 'perro', 1: 'gato', 2: 'cabra', length: 3 }
var animal = at(arr, -1)
console.log(animal) // expected output: 'cabra'