console.log('TEST Array.prototype.forEach')

console.log('CASE print characters in array')

var chars = ['a', 'b', 'c']

chars.forEach(function (char) { console.log(char) })
// "a"
// "b"
// "c"

console.log('CASE sum numbers from array')

var numbers = [100, 200, 300]
var result = 0

numbers.forEach(function (number) { result += number })

console.log(result)
// 600