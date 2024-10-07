console.log('TEST Array.prototype.at')

console.log('CASE get number at index 3 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(3)
console.log(num)
// 400

console.log('CASE get number at index -3 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(-3)
console.log(num)
// 300

console.log('CASE get number at index -10 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(-10)
console.log(num)
// undefined

console.log('CASE get number at index 10 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(10)
console.log(num)
// undefined