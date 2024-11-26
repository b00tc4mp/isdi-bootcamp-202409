console.log('TEST Array.prototype.at')

//caso 1 (index 2)
console.log('CASE obtain index 2 of nums')

var nums = [100, 200, 300, 400, 500]
var num = nums.at(2)

console.log(num)
// 300


//caso 2 (index -2)
console.log('CASE obtain index -2 of nums')

var nums = [100, 200, 300, 400, 500]
var num = nums.at(-2)

console.log(num)
// 400


//caso 3 (index 10)
console.log('CASE obtain index outofRange of nums')

var nums = [100, 200, 300, 400, 500]
var num = nums.at(-10)

console.log(num)
// undefined