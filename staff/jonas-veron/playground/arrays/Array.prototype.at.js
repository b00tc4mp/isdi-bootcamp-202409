console.log('TEST array.prototype.at')
console.log('CASE locate index 2 on array1')

var array1 = [5, 12, 8, 130, 44];

var index = 2;

console.log('An index of '+ index +' returns '+ array1.at(index));
// Expected output: "An index of 2 returns 8"

console.log('CASE locate index -2 on array1')

index = -2;

console.log('An index of ' + index + ' returns ' + array1.at(index));
// Expected output: "An index of -2 returns 130"

console.log('CASE locate index -10 on array1')

var array1 = [5, 12, 8, 130, 44];

var index = -10;

console.log('An index of ' + index + ' returns ' + array1.at(index));
//undefined

var nums = [100, 200, 300, 400, 500]
var num = nums.at(3)
console.log(num)
//400
