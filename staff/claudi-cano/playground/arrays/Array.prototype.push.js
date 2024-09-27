console.log('TEST Array.prototype.push')

console.log('CASE add 400 to nums')

//The push() method of Array instances adds the specified elements to the end of an array and returns the new length of the array

var nums = [100, 200, 300]
nums.push(400)

console.log(nums)
// [100, 200, 300, 400] (4)

console.log(length)
//4

console.log('CASE add banana to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana')

console.log(fruits)
// ['apple', 'orange', 'raspberry', 'pineapple', 'banana'] (5)
console.log(length)
// 5
