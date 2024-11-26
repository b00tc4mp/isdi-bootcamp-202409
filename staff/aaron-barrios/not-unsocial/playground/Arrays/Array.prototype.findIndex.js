console.log('TEST Array.prototype.findIndex')

//caso 1 (element 10)
console.log('CASE findIndex element 13')
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// Expected output: 3


