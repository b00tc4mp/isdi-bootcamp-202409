console.log('TEST Array.prototype.push')
//Esta función (push) agrega un objeto al array a partir de la posición final.
console.log('CASE add 400 to nums')

var nums = [100, 200, 300]
var length = nums.push(400)

console.log(nums)
// [100, 200, 300, 400] (4) //este seria el nuevo array con el 400 incluido por el push.
console.log(length)
// 4

console.log('CASE add banana to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana')

console.log(fruits)
// ['apple', 'orange', 'raspberry', 'pineapple', 'banana']
console.log(length)
// 5

console.log('CASE add banana, pear and coconut to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana', 'pear', 'coconut')

console.log(fruits)
// ['apple', 'orange', 'raspberry', 'pineapple', 'banana', 'pear', 'coconut']
console.log(length)
// 7