var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}
console.log('TEST Raid prototype join()')

Raid.prototype.join= function(separator) {
    var result = ''
    if (separator === undefined) {
        separator = ','
    }
    for (var i = 0; i < this.length; i++) {
        i === 0 ? result += this[i] : result += separator + this[i]
    }
    return result
}


console.log('CASE join string in array elements with join')

var elements = new Raid('Fire', 'Air', 'Water');


console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"
