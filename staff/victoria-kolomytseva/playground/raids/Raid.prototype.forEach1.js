var Raid = function () { this.length = 0 }

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        callback(element)
    }
}



console.log('Test Array.prototype.forEach')

console.log('CASE executes a provided function once for each array element')

var nombres = new Raid
nombres[0] = 'Victoria'
nombres[1] = 'Anna'
nombres[2] = 'Alba'
nombres[3] = 'Monica'
nombres.length = 4
// Expected output: "Victoria"
// Expected output: "Anna"
// Expected output: "Alba"
// Expected output: "Monica"

var elem = function (element) {
    console.log(element)
}

nombres.forEach(elem)