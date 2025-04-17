console.log('TEST Array.prototype.forEach')

console.log('CASE sum the numbers in the array')

var nums = [5, 4, 5]
var sum = 0

nums.forEach(function (num) {
    sum += num
})

console.log(sum)
// 14