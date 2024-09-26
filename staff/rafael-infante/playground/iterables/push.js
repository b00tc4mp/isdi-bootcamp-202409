console.log('TEST  iterables/push')
//add a specified element to the end of and array
// return the length of the modified array
var push = function (iterable, element) {
  iterable[iterable.length] = element;
  iterable.length++;
  return iterable.length
}

console.log('CASE add 400 to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var length = push(nums, 400)
console.log(nums) // expected output { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
console.log(length) // expected output 4

console.log('CASE add cows to animals')

var animals = { 0: 'pigs', 1: 'goats', 2: 'dogs', 3: 'sheep', length: 4 }
var length = push(animals, 'cows')
console.log(animals) // Expected output: { 0: 'pigs', 1: 'goats', 2: 'dogs', 3: 'sheep', 4: 'cows', length: 5}
console.log(length) // expected output: 5