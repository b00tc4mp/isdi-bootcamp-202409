var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.find')
Raid.prototype.find = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i]) === true) {
            return this[i]
        }
    }
    return undefined
}

var raid1 = new Raid(5, 12, 8, 130, 44);

var found = raid1.find(function (element) {
    return element > 10
});

console.log(found);
// Expected output: 12
