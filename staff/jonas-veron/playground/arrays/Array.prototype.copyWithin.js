console.log('TEST Array.prototype.copyWithin')


console.log('CASE copy with one element')

var array = [1, 2, 3, 4, 5]
var result = array.copyWithin(-2);
console.log(result)
// [1, 2, 3, 1, 2]


console.log('CASE Copy to index 0 the element at index 3')

const array1 = ['a', 'b', 'c', 'd', 'e']

console.log(array1.copyWithin(0, 3, 4));
// ["d", "b", "c", "d", "e"]


console.log('CASE Copy to index 1 all elements from index 3 to the end')




console.log(array1.copyWithin(1, 3));
// ["d", "d", "e", "d", "e"]
