var join = function (iterable, separator) {
    var outcome = '';
    for (var i = 0; i < iterable.length; i++) {
        i == iterable.length - 1 ? outcome = outcome + iterable[i]
            : outcome = outcome + iterable[i] + (arguments.length !== 2 ? ',' : separator)
    }
    return outcome
}

console.log('TEST join')

console.log('CASE create separator \'-\'')

var elements = { 0: 'Air', 1: 'Fire', 2: 'Water', 3: 'Earth', length: 4 }
var separatedElements = join(elements, '-')

console.log(separatedElements)
// Air-Fire-Water-Earth

console.log('CASE create default separator')

var elements = { 0: 'Air', 1: 'Fire', 2: 'Water', 3: 'Earth', length: 4 }
var separatedElements = join(elements)

console.log(separatedElements)
// Air,Fire,Water,Earth