//                       obj1,    6,     1,    3
var fill = function (iterable, value, start, end) {


    // undefined === false
    if (start === undefined) {
        start = 0
    }
    if (end === undefined) {
        end = iterable.length
    }

    for (var i = start; i < end; i++) {
        iterable[i] = value
    }

    return iterable
}




var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }
var obj = fill(obj1, 6, 1, 3)
console.log(obj)
// Expected output: {1, 6, 6, 4}

