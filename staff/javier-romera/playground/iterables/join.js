var join = function (iterable, separator) {
    var outcome = ''
    if (!separator) {
        separator = ','
    }
    for (var i = 0; i < iterable.length; i++) {
        if (i == iterable.length - 1) {
            outcome = outcome + iterable[i]
        }
        else { outcome = outcome + iterable[i] + separator }
    }
    return outcome
}

console.log('CASE create separator \'-\'')

var elements = { 0: 'Air', 1: 'Fire', 2: 'Water', 3: 'Earth', length: 4 }
var elementsSeparated = join(elements, '-')

console.log(elementsSeparated)
// Air-Fire-Water-Earth