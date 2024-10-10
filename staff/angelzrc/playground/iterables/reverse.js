console.log('TEST array prototype reverse for iterables')

var reverse = function (iterable) {
    // make a new iterable iterating the first one in reverse order
    // asign the new iterable to the original variable
    var reversed = {}

    for (var i = 0; i < iterable.length; i++) {
        reversed[i] = iterable[iterable.length - 1 - i]
    }
    reversed.length = iterable.length
    iterable = reversed
    return iterable
}

console.log('CASE reverse the order of the values inside iterable')

var hundreds = { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }

var reversed = reverse(hundreds)

console.log(hundreds)
