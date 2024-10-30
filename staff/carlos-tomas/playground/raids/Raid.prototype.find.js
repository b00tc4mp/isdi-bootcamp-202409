var Raid = function () {
    this.length = 0
}
console.log("TEST Raid.prototype.find.js")

Raid.prototype.find = function (callback) {

    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        var found = callback(element)

        if (found) return element
    }
}

console.log("CASE comparate array1 for element")

var obj = new Raid
obj[0] = 5
obj[1] = 12
obj[2] = 8
obj[3] = 130
obj[4] = 44
obj.length = 5

var found = obj.find(function (element) {
    return element > 10
})
console.log(found);
// Expected output: 12

var found = obj.find(function (element) {
    return element > 100
})
console.log(found)
//Expected output: 130
