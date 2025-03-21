console.log('TEST Array.prototype.unshift')

console.log('CASE add 4,5 to array1')

const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// Expected length output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]
