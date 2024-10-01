console.log('TEST Arrays.prototype.copyWithin')

console.log('CASE copy to index 0 the element at index 3')

var array = ['a', 'b', 'c', 'd', 'e'];
console.log(array.copyWithin(0, 3, 4));
// ["d", "b", "c", "d", "e"]

console.log('CASE copy to index 0 the elements between index 2 and 4')

var array = ['a', 'b', 'c', 'd', 'e'];
console.log(array.copyWithin(0, 2, 4));
// ["c", "d", "c", "d", "e"]

console.log('CASE copy to index 1 all elements from index 3 to the end')

var array = ['a', 'b', 'c', 'd', 'e'];
console.log(array.copyWithin(1, 3));
// ["a", "d", "e", "d", "e"]

console.log('CASE copy with negative indexes')

var array = ['a', 'b', 'c', 'd', 'e'];
console.log(array.copyWithin(-2, -3, -1));
// ["a", "b", "c", "c", "d"]

console.log('CASE copy with target out of range')

var array = ['a', 'b', 'c', 'd', 'e'];
console.log(array.copyWithin(7, 1, 2));
// ["a", "b", "c", "d", "e"]

console.log('CASE copy with target after start')

var array = ['a', 'b', 'c', 'd', 'e'];
console.log(array.copyWithin(4, 0, 3));
// ["a", "b", "c", "d", "a"]