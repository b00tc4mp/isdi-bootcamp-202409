var join = function (iterable, separator) {
    /*
    iterable -> { 0: 'Fire', 1: 'Air', 2: 'Water', 3: 'Earth', length: 4 }

    result -> ''

    result -> 'Fire'
    result -> 'Fire,Air'
    result -> 'Fire,Air,Water'
    result -> 'Fire,Air,Water,Earth'

    return result
    */

    var result
    var separator2 = separator === undefined ? ',' : separator

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        if (i === 0)
            result = element // result = result + element
        else
            result += separator2 + element // result = result + separator + element
    }

    return result
}

console.log('TEST join')

console.log('CASE join elements')

var elements = { 0: 'Fire', 1: 'Air', 2: 'Water', 3: 'Earth', length: 4 }
var joined = join(elements)
console.log(joined)
// 'Fire,Air,Water,Earth'

console.log('CASE join elements with #')

var elements = { 0: 'Fire', 1: 'Air', 2: 'Water', 3: 'Earth', length: 4 }
var joined = join(elements, '#')
console.log(joined)
// 'Fire#Air#Water#Earth'