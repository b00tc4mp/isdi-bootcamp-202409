var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.reduce')

Raid.prototype.reduce = function (callback) {
    var accumulator = 0
    var initialValue = 0
    for (var i = 0; i < this.length; i++) {

        var currentValue = this[i]
        if (currentValue === undefined) {
            currentValue = initialValue
        }
        accumulator += currentValue

    }

    return accumulator


}

var raid1 = new Raid(1, 2, 3, 4);

// 0 + 1 + 2 + 3 + 4
var initialValue = 0;
var sumWithInitial = array1.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
);

console.log(sumWithInitial);
// Expected output: 10