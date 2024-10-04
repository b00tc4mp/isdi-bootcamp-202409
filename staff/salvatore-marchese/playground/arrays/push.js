
var push = function(iterable, element) {//-//
}

console.log('TEST Array.prototype.push')

console.log('CASE add 400 ti nums')

var  nums = [100, 200, 300]
var length = nums.push(400)

console.log(nums)
// [100, 200, 300, 400] (4)
console.log(length)
// 4 

console.log('CASE add banana to fruit')

//ARRAY var fruits = [] crochetes// 
var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana')

console.log(fruits)
// ['apple', 'orange', 'raspberry', 'pineapple', 'banana'] (5)
console.log(length)
// 5

//OBJECTO var fruits = {} clave//
var fruits = { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', length: 4}
var length = push(fruit,'banana')
