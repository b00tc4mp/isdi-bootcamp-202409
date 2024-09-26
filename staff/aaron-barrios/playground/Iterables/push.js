var push = function (iterable, element) {
    iterable[iterable.length] = element
    iterable.length++

    return iterable.length
}
console.log('TEST push')

console.log('CASE add 400 to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var length = push(nums, length)

console.log(nums)
//{ 0: 100, 1: 200, 2:300, 3:400 length: 4}

console.log(length)
//4

var fruits = { 0: 'pear', 1: 'apple', 2: 'banana', 3: 'strawberry', length: 4 }
var length = push(fruits, length)

console.log(fruits)
//{ 0: 'pear', 1: 'apple', 2: 'banana', 3:'strawberry', 4: 'higo', length: 5}

console.log(length)
//5