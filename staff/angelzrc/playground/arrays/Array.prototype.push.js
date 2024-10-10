console.log('TEST Array.prototype.push')

console.log('CASE add 400 to nums')

var nums = [100, 200, 300]
var length = nums.push(400)


console.log(nums)
// [100, 200, 300, 400]
console.log(length)
// 4

console.log('CASE add banana to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana', 'pear', 'coconut')

console.log(fruits)

console.log(length)