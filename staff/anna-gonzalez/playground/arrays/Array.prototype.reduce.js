console.log('TEST Array.prototype.reduce')

console.log('CASE sum the numbers with initial value 0')

var numbers = [1, 2, 3, 4]

var initialValue = 0

var sumWithInitial = numbers.reduce(function (accumulator, currentValue) { return accumulator + currentValue }, initialValue)

console.log(sumWithInitial)
// 10