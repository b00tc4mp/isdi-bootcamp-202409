console.log('TEST Array.prototype.copyWithin')

console.log('CASE copie a part of an array to another location')

// The copyWithin() method of Array instances shallow copies part of this array to another location in the same array and returns this array without modifying its length.

const array1 = ['a', 'b', 'c', 'd', 'e'];

// Copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]
