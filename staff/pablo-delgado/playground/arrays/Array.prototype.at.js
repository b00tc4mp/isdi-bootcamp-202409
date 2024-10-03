console.log('TEST Array.prototype.at')
console.log('CASE locate index 2 on array1')

var nums = [100, 200, 300, 400]

var num = nums.at(3)
console.log(num)

console.log('CASE get number at index -3 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(-3)
console.log(num)

console.log('CASE get number at index -10 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(-10)
console.log(num)

console.log('CASE get number at index 10 in nums')

var num = nums.at(10)
console.log(num)