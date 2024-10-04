console.log('TEST Array.prototype.push')
console.log('CASE add 400 to nums')

var nums = [0, 100, 200, 300]
var length = nums.push(400)

console.log(nums)
//[0, 100, 200, 300, 400]
console.log(length)
//5

console.log('CASE add banana to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana')

console.log(fruits)
//['apple', 'orange', 'raspberry', 'pineapple', 'banana']
console.log(length)
// 5

