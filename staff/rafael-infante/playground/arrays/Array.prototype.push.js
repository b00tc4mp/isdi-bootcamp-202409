console.log('TEST Array.prototype.push')

console.log('CASE add 400 to nums')

var nums = [100, 200, 300]
var length = nums.push(400);

console.log(nums)
// expected output: [100, 200, 300, 400] (4)
console.log(length)
// expected output: 4

console.log('CASE add cows to animals')

var animals = ['pigs', 'goats', 'dogs', 'sheep'];
var length = animals.push('cows')

console.log(animals);
// Expected output: Array ["pigs", "goats", "dogs", "sheep", "cows"] (5)
console.log(length);
// Expected output 5

console.log('CASE add cats and hamsters to animals')

var fruits = ['pigs', 'goats', 'dogs', 'sheep']