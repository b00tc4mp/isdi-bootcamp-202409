var Raid = function () {
    this.length = 0;
}

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback(this[i])
    }
}

var printElement = function (element) {
    console.log(element)
}

var chars = new Raid
chars[0] = "a"
chars[1] = "b"
chars[2] = "c"
chars[3] = "d"
chars.length = 4

chars.forEach(printElement)

// V2

var Raid = function () {
    this.length = 0;
}

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback(this[i])
    }
}
var result = 0;

var sum = function (num) {
    result += num
}

var nummbers = new Raid
nummbers[0] = 100
nummbers[1] = 200
nummbers[2] = 300
nummbers[3] = 400
nummbers.length = 4

nummbers.forEach(sum)
console.log(result)

