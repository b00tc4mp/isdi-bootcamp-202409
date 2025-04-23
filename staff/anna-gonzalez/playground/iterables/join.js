var join = function (iterable, separator) {
    // create a new iterable
    var jointIterable = ''
    if (!separator) {
        var separator = ','
    }
    // go through iterable adding a comma between elements
    for (var i = 1; i < iterable.length; i++) {
        var element = iterable[i]
        jointIterable += separator + element
    }
    return iterable[0] + jointIterable
    // return new iterable without changing the length
}

console.log('TEST join')

console.log('CASE join iterable with commas')

var elements = { 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 }

console.log(join(elements))
// "Fire,Air,Water"

console.log('CASE join iterable without spaces')

var elements = ['Fire', 'Air', 'Water'];

console.log(join(elements, ''))
// "FireAirWater"

console.log('CASE join iterable with hyphens')

var elements = ['Fire', 'Air', 'Water'];

console.log(join(elements, '-'))
// "Fire-Air-Water"