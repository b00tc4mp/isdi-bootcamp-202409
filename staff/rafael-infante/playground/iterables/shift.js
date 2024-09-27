console.log('TEST iterables/shift')
// remove the first element of an array
// change the length of the array
// return the element removed
var shift = function (iterable) {
  var first = iterable[0]
  for (var i = 0; i < iterable.length - 1; i++) {
    iterable[i] = iterable[i + 1]
  }
  delete iterable[iterable.length - 1]
  iterable.length--;
  return first
}


console.log('CASE remove 100 from nums')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
var element = shift(nums)
console.log(nums) // Expected output { 0: 200, 1: 300, 2: 400, length: 3}
console.log(element) // Expected Output: 100

console.log('CASE remove cows from animals')
var animals = { 0: 'pigs', 1: 'goats', 2: 'dogs', 3: 'sheep', 4: 'cows', length: 5 }
var element2 = shift(animals)
console.log(animals) // Expected output { 0: 'goats', 1: 'dogs', 2: 'sheep', 3: 'cows', length: 4}
console.log(element2) // Expected Output 'pigs'