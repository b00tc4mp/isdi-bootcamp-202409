console.log('TEST Array.prototype.pop')

console.log('CASE remove 400 from nums')

var nums = [100, 200, 300, 400]
var element = nums.pop(400);

console.log(nums)
// expected output: [100, 200, 300] (3)
console.log(element)
// expected output: 400

console.log('CASE remove cows from animals')

var animals = ['pigs', 'goats', 'dogs', 'sheep', 'cows'];
var element2 = animals.pop('cows')

console.log(animals);
// Expected output: Array ["pigs", "goats", "dogs", "sheep"] (4)
console.log(element2);
// Expected output 'cows'