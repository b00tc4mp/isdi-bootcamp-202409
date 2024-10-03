var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.map')

Raid.prototype.map = function (callback) {
    var raid2 = new Raid
    for (var i = 0; i < this.length; i++) {
        raid2[i] = callback(this[i])
        raid2.length++
    }
    return raid2
}


var raid1 = new Raid(1, 4, 9, 16);

// Pass a function to map
var map1 = raid1.map(function (x) {
    return x * 2
});

console.log(map1);
// Expected output: Raid {0: 2, 1: 8, 2: 18, 3: 32, length: 4}