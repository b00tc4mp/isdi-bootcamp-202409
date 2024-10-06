console.log('TEST Array.prototype.reverse')

console.log('CASE reverse numbers')

var numbers = ['one', 'two', 'three', 'four', 'five']
console.log(numbers)
// ['one', 'two', 'three', 'four', 'five']

var reversed = numbers.reverse()
console.log(reversed)
// ['five', 'four', 'three', 'two', 'one']

console.log(numbers)
// numbers has changed forever...