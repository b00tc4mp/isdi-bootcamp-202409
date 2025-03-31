console.log('TEST iterables/pop')
// remove the last element of an array
// change the length of the array
// return the element removed
var pop = function (iterable) {
  var last = iterable[iterable.length - 1]
  delete iterable[iterable.length - 1]
  iterable.length--
  return last
}


console.log('CASE remove 400 from nums')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
var element = pop(nums)
console.log(nums) // Expected output { 0: 100, 1: 200, 2: 300, length: 3}
console.log(element) // Expected Output: 400

console.log('CASE remove cows from animals')
var animals = { 0: 'pigs', 1: 'goats', 2: 'dogs', 3: 'sheep', 4: 'cows', length: 5 }
var element2 = pop(animals)
console.log(animals) // Expected output { 0: 'pigs', 1: 'goats', 2: 'dogs', 3: 'sheep', length: 4}
console.log(element2) // Expected Output 'cows'