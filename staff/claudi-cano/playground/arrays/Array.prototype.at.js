console.log('TEST Array.prototype.at')

console.log('CASE locate index 2 on array1')

//The at() method of Array instances takes an integer value and returns the item at that index

var array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log('An index of ' + index + ' returns ' + array1.at(index));
// Expected output: "An index of 2 returns 8"

index = -2;

console.log('An index of ' + index + ' returns ' + array1.at(index));
// Expected output: "An index of -2 returns 130"


console.log('CASE get number at index 3 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(3)
console.log(num)
// 400

console.log('CASE get number at index -3 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(-3)
console.log(num)
// 300

console.log('CASE get number at index -10 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(-10)
console.log(num)
// undefined