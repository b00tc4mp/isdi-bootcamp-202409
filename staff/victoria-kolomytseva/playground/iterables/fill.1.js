var fill = function (iterable, value) {
    for (var i = 0; i < iterable.length; i++) {
        iterable[i] = value
    }

    return iterable
}

var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }
var obj = fill(obj1, 6)
console.log(obj)
// Expected output: {6, 6, 6, 6}