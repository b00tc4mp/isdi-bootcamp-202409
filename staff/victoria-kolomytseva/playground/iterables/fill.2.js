var fill = function (iterable, value, start) {

    // undefined === false
    if (start === undefined) {
        start = 0
    }

    for (var i = start; i < iterable.length; i++) {
        iterable[i] = value
    }

    return iterable
}




var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }
var obj = fill(obj1, 6, 1)
console.log(obj)
// Expected output: {1, 6, 6, 6}

