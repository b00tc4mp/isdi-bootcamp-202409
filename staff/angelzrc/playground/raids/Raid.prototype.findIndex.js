var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Array.prototype.findIndex')

Raid.prototype.findIndex = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i]) === true) {
            return i
        }
    }
}

var raid1 = new Raid(5, 12, 8, 130, 44);

var isLargeNumber = function (element) {
    if (element > 13) {
        return true
    }
};

console.log(raid1.findIndex(isLargeNumber));
// Expected output: 3
