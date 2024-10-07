console.log('TEST  iterables/push')
//add a specified element to the end of and array
// return the length of the modified array
var push = function (iterable, element) {
  if (arguments.length === 2) {
    iterable[iterable.length] = element;
    iterable.length++;
  } else {
    for (var i = 1; i < arguments.length; i++) {
      iterable[iterable.length] = arguments[i];
      iterable.length++;
    }
  }
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

console.log('CASE add "coconut", "pear" & "mango" to fruits')

var fruits = { 0: 'banana', 1: 'apple', 2: 'kiwi', 3: 'grape', length: 4 }
var length = push(fruits, 'coconut', 'pear', 'mango')
console.log(fruits)
console.log(length) // expected output: { 0: 'banana', 1: 'apple', 2: 'kiwi', 3: 'grape', 4: 'coconut', 5: 'pear', 6: 'mango', length: 7 }