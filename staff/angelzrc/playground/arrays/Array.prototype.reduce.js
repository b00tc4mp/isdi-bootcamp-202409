console.log('TEST Array.prototype.reduce')

var array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
var initialValue = 0;
var sumWithInitial = array1.reduce(
    function (accumulator, currentValue) {
        if (currentValue === undefined) {
            currentValue = initialValue
        }
        return accumulator + currentValue
    }
);

console.log(sumWithInitial);
// Expected output: 10