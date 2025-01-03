console.log('TEST Array.prototype.map')

console.log('CASE multiply the array times 2')

var array1 = [1, 4, 9, 16]

// Pass a function to map
var map1 = array1.map(function (x) {
    return x * 2
})

console.log(map1);
// [2, 8, 18, 32]