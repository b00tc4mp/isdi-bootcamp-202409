console.log('TEST Array.prototype.find')

var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function (element) {
    if (element > 10) {
        return element
    }
});

console.log(found);
// Expected output: 12
