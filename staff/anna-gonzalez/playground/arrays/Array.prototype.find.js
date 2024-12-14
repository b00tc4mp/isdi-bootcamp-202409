console.log('TEST Array.prototype.find')

console.log('CASE find first number bigger than 10 in array')

var numbers = [5, 12, 8, 130, 44]

numbers.find(function (number) { return number > 10 })
// 12