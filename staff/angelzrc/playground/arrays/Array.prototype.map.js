console.log('TEST Array.prototype.map')

var array1 = [1, 4, 9, 16];

// Pass a function to map
var map1 = array1.map(function (x) {
    x * 2
});

console.log(map1);
// Expected output: Array [2, 8, 18, 32]