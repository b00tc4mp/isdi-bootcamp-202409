var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}


console.log('TEST Raid.prototytpe.forEach')

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback(this[i])
    }
}

var array1 = new Raid('a', 'b', 'c');

array1.forEach(function (element) {
    console.log(element)
});

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"