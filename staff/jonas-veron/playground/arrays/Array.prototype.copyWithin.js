console.log('TEST Array.prototype.copyWithin')



console.log('CASE copy with one element')
var nums = [100, 200, 300, 400, 500]
var result = nums.copyWithin(-2);
console.log(result)
// [100, 200, 300, 100, 200]


console.log('CASE copy with one element')
var nums = [100, 200, 300, 400, 500]
var result = nums.copyWithin(2);
console.log(result)
// [100, 200, 100, 200, 300]

var nums = [100, 200, 300, 400, 500]
var result = copyWithin(nums, 0, 3)
console.log(result)
//[400, 500, 300, 400, 500]





