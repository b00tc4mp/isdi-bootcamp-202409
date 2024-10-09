console.log("TEST array.prototype.findIndex")


console.log("CASE compare array1 and element dando el indice")
var array1 = [5, 12, 8, 130, 44];

var isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));

// Expected output: 3


var isLargeNumber = (element) => element === 12;

console.log(array1.findIndex(isLargeNumber));

// Expected output: 1

var isLargeNumber = (element) => element < 12;

console.log(array1.findIndex(isLargeNumber));

// Expected output: 0