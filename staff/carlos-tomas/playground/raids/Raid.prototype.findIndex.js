var Raid = function () {
    this.length = 0
}

console.log("TEST Raid.prototy.findIndex.js")


Raid.prototype.findIndex = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (callback(element)) { return i }
    }
    return -1
}


console.log("CASE compare array1 and element dando el indice")
var obj = new Raid
obj[0] = 5
obj[1] = 12
obj[2] = 8
obj[3] = 130
obj[4] = 44
obj.length = 5

var found = obj.findIndex(function (element) {
    return element > 44
})
console.log(found)
// Expected output: 3

var found = obj.findIndex(function (element) {
    return element === 12
})
console.log(found)
// Expected output: 1

var found = obj.findIndex(function (element) {
    return element < 12
})
console.log(found)
// Expected output: 0