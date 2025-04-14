console.log('TEST Array.prototype.copyWithin');

console.log('CASE copy to index 0 the element at index 3');

var chars = ['a', 'b', 'c', 'd', 'e'];
console.log(chars.copyWithin(0, 3, 4));
// Array ["d", "b", "c", "d", "e"]

console.log('CASE copy to index 1 all elements from index 3 to the end')

var chars = ['a', 'b', 'c', 'd', 'e'];
console.log(chars.copyWithin(1, 3));
// Array ["a", "d", "e", "d", "e"]

