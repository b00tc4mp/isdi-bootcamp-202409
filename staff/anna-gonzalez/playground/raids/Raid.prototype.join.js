var Raid = function () {
    this.length = 0
}

Raid.prototype.join = function (separator) {
    var jointIterable = ''
    if (separator === undefined) {
        var separator = ','
    }
    for (var i = 1; i < this.length; i++) {
        var element = this[i]
        jointIterable += separator + element
    }
    return this[0] + jointIterable
}

console.log('TEST join')

console.log('CASE join Raid with commas')

var elements = new Raid
elements[0] = 'Fire'
elements[1] = 'Air'
elements[2] = 'Water'
elements.length = 3

console.log(elements.join())
// "Fire,Air,Water"

console.log('CASE join Raid without spaces')

var elements = new Raid
elements[0] = 'Fire'
elements[1] = 'Air'
elements[2] = 'Water'
elements.length = 3

console.log(elements.join(''))
// "FireAirWater"

console.log('CASE join Raid with hyphens')

var elements = ['Fire', 'Air', 'Water'];

console.log(elements.join('-'))
// "Fire-Air-Water"