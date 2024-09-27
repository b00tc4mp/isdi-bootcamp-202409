console.log('TEST Array.prototype.shift')

console.log('CASE remove 100 from nums')

var nums = [100, 200, 300, 400]
var element = nums.shift();

console.log(nums)
// expected output: [200, 300, 400] (3)
console.log(element)
// expected output: 100

console.log('CASE remove pigs from animals')

var animals = ['pigs', 'goats', 'dogs', 'sheep', 'cows'];
var element2 = animals.shift()

console.log(animals);
// Expected output: Array ["goats", "dogs", "sheep", 'cows'] (4)
console.log(element2);
// Expected output 'pigs'