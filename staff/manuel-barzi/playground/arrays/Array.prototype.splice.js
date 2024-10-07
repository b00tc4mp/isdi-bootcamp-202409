console.log('TEST Array.prototype.splice')

console.log('CASE extract elements from index 3')

var nums = [100, 200, 300, 400, 500, 600, 700]
var extracted = nums.splice(3)
console.log(nums)
// [100, 200, 300]
console.log(extracted)
// [400, 500, 600, 700]

console.log('CASE extract elements from index 1 and delete 2')

var nums = [100, 200, 300, 400, 500, 600, 700]
var extracted = nums.splice(1, 2)
console.log(nums)
// [100, 400, 500, 600, 700]
console.log(extracted)
// [200, 300]