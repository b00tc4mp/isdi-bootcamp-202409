console.log('TEST Array.prototype.findIndex')

var array1 = [5, 12, 8, 130, 44];

var isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// Expected output: 3
