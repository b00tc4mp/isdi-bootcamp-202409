var Raid = function () { this.length = 0 }

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        callback(element)
    }
}


console.log('TEST Array.prototype.forEach')

console.log('CASE print characters in iterable')

var chars = new Raid
chars[0] = "a"
chars[1] = "b"
chars[2] = "c"
chars.length = 3

var printElement = function (element) {

    console.log(element)
}

chars.forEach(printElement)