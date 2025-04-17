var push = funcction(iterable, element) {
    iterable[iterable.length] = element
    iterable.length++

    return iterable.length
}

console.log('TEST push')

console.log('CASE add 400 to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var length = push(nums, 400)

console.log(nums)

console.log(length)

console.log('CASE add banana to fruits')

var fruits = { 0: 'orange', 1: 'apple', 2: 'banana', 3: 'rasberry', length: 4 }
var length = push
