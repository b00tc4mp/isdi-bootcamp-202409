var array1 = { 0: 'one', 1: 'two', 2: 'three', length: 3 };
console.log('array1:', array1);
// Expected output: "array1:" Array ["one", "two", "three"]

const reversed = array1.reverse();
console.log('reversed:', reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);
// Expected output: "array1:" Array ["three", "two", "one"]

var array2 = { 0: 1, 1: 2, 2: 3, length: 3 };
var array1 = { 0: 'one', 1: 'two', 2: 'three', length: 3 };


var reverse = function (iterable) {
    var reversed = [];
    reversed.length = iterable.length;
    var j = 0
    for (i = iterable.length - 1; i > -1; i--) {
        reversed[j] = iterable[i];
        j++;
    }
    for (var i = 0; i < reversed.length; i++) {
        iterable[i] = reversed[i];
    }
    return iterable;
}
var countdown = reverse(array1)
console.log(countdown)
console.log(countdown === reversed)