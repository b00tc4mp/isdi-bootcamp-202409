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


console.log('CASE Copy to index 0 the element at index 3')
var array1 = ['a', 'b', 'c', 'd', 'e']
console.log(array1.copyWithin(0, 3, 4));
// ["d", "b", "c", "d", "e"]

console.log('CASE Copy to index 1 all elements from index 3 to the end')
var array1 = ['a', 'b', 'c', 'd', 'e']
console.log(array1.copyWithin(1, 3));
// ["a", "d", "e", "d", "e"]
