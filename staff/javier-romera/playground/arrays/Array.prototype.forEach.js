console.log('TEST Array.prototype.forEach')

console.log('CASE print characters in array')

var chars = ['a', 'b', 'c']

chars.forEach(function (element) {
    console.log(element)
}) // callback
// a
// b
// c

console.log('CASE sum numbers from array')

var nums = [100, 200, 300]
var result = 0

nums.forEach(function (num) {
    result += num
})

console.log(result)
// 600