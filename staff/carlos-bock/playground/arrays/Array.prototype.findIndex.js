
console.log('TEST Array.prototype.find');
console.log('CASE find index of first greater than 10');

var array1 = [5, 12, 8, 130, 44];
var isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// Expected output: 3

//Return value: The index of the first element in the array that passes the test. Otherwise, -1.