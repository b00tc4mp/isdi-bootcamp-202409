var Raid = function () {
    this.length = 0
}

Raid.prototype.lastIndexOf = function (searchElement, fromIndex) {
    for (var i = (arguments.length === 1 ? this["length"] - 1 : (fromIndex >= 0 ? fromIndex : ((this.length - 1) + fromIndex)));
        i >= 0;
        i--
    ) {
        var element = this[i]

        if (element === searchElement) return i
    }
    return -1
}

console.log("TEST Raid.prototype.lastIndexOf");

console.log("CASE get last index of 'a'");

var chars = new Raid
chars[0] = "a"
chars[1] = "b"
chars[2] = "c"
chars[3] = "a"
chars[4] = "d"
chars.length = 5
var lastIndex = chars.lastIndexOf("a");
console.log(lastIndex);
// 3

console.log("CASE get last index of 'a' from index 2")

var chars = new Raid
chars[0] = "a"
chars[1] = "b"
chars[2] = "c"
chars[3] = "a"
chars[4] = "d"
chars.length = 5
var lastIndex = chars.lastIndexOf("a", 2);
console.log(lastIndex);
// 0

console.log("CASE get last index of 'a' from index -3");

var chars = new Raid
chars[0] = "a"
chars[1] = "b"
chars[2] = "c"
chars[3] = "a"
chars[4] = "d"
chars.length = 5
var lastIndex = chars.lastIndexOf("a", -3);
console.log(lastIndex);
// 0

console.log("CASE index of 'd' from -2 not found")

var chars = new Raid
chars[0] = "a"
chars[1] = "b"
chars[2] = "c"
chars[3] = "a"
chars[4] = "d"
chars.length = 5
var lastIndex = chars.lastIndexOf("d", -2);
console.log(lastIndex);
// -1