console.log('TEST Array.prototype.push')

console.log('CASE add 400 to nums')

var nums = [100, 200, 300]
var length = nums.push(400)

console.log(nums)
// (4) [100, 200, 300, 400]
console.log(length)
//  4

console.log('CASE add banana to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana')

console.log(fruits)
// (5) ['apple', 'orange', 'raspberry', 'pineapple', 'banana']
console.log(length)
//  5

console.log('CASE add banana, coconut and watermelon to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana', 'coconut', 'watermelon')

console.log(fruits)
// (7) ['apple', 'orange', 'raspberry', 'pineapple', 'banana', 'coconut', 'watermelon']
console.log(length)
//  7