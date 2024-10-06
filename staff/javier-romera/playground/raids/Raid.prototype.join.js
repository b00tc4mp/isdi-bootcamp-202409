var Raid = function () {
    this.length = 0
}

Raid.prototype.join = function (separator) {
    var outcome = '';
    for (var i = 0; i < this.length; i++) {
        i == this.length - 1 ? outcome = outcome + this[i]
            : outcome = outcome + this[i] + (arguments.length !== 1 ? ',' : separator)
    }
    return outcome
}

console.log('TEST Raid.prototype.join')

console.log('CASE create separator \'-\'')

var elements = new Raid
elements[0] = 'Air'
elements[1] = 'Fire'
elements[2] = 'Water'
elements[3] = 'Earth'
elements.length = 4

var elementsSeparated = elements.join('-')

console.log(elementsSeparated)
// Air-Fire-Water-Earth