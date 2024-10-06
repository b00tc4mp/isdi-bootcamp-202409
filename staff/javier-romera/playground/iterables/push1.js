var push = function (iterable, element) {
    if (arguments === 2) {
        iterable[iterable.length] = element
        iterable.length++
        return iterable.length
    }
    else {
        for (var i = 1; i < arguments.length; i++) {
            iterable[iterable.length] = arguments[i]
            iterable.length++
        }
        return iterable.length
    }
}

console.log('TEST push')

console.log('CASE add 400 to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var length = push(nums, 400)

console.log(nums)
// { 0: 100, 1: 200, 2: 300, 3: 400 length: 4 }
console.log(length)
//  4

console.log('CASE add banana to fruits')

var fruits = { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', length: 4 }
var length = push(fruits, 'banana')

console.log(fruits)
// (5) ['apple', 'orange', 'raspberry', 'pineapple', 'banana']
console.log(length)
//  5

console.log('CASE add banana, coconut and watermelon to fruits')

var fruits = { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', length: 4 }
var length = push(fruits, 'banana', 'coconut', 'watermelon')

console.log(fruits)
// (7) {0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', 4: 'banana', 5: 'coconut', 6: 'watermelon', length: 7 }
console.log(length)
//  7