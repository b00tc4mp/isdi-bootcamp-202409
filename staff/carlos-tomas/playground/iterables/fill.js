var fill = function (iterable, value, start, end) {
    if (typeof start === "number") {

    } else {

        start = 0
    }
    if (typeof end === "number") {

    } else {

        end = iterable.length
    }

    for (var i = start; i < end; i++) {

        iterable[i] = value
    }
    return iterable
}

var array = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 5, 7: 6, length: 8 }

console.log(fill(array, 25, 3, 6))