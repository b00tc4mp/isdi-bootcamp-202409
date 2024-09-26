var push = function (iterable, element) {
    iterable[iterable.length] = element
    iterable.length++

    return iterable.length
}

console.log('TEST push')

console.log('CASE add 400 to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var length = push(nums, 400)

console.log(nums)
// { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
console.log(length)
// 4

console.log('CASE add banana to fruits')

var fruits = { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', length: 4 }
var length = push(fruits, 'banana')

console.log(fruits)
// { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', 4: 'banana', length: 5 }
console.log(length)
// 5
