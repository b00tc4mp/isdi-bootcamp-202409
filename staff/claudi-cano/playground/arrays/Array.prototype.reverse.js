console.log('TEST Array.prototype.reverse')

console.log('CASE reverse the elements in an array without mutating the original')

//The reverse() method of Array instances reverses an array in place and returns the reference to the same array

var array1 = ['one', 'two', 'three'];
console.log('array1:', array1);
// Expected output: "array1:" Array ["one", "two", "three"]

var reversed = array1.reverse();
console.log('reversed:', reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);
// Expected output: "array1:" Array ["three", "two", "one"]