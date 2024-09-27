console.log('TEST Array.prototype.reverse')

console.log('CASE reverse numbers')

var numbers = ['one', 'two', 'three']
var reversed = numbers.reverse()
console.log(reversed) // Expected output ["three", "two", "one"]

console.log('CASE reverse letters')

var letters = ['a', 'b', 'c']
var reversed2 = letters.reverse()
console.log(reversed2) // Expected output ['c', 'b', 'a']