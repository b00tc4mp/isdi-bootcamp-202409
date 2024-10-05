var fill = function (iterable, value, start, end) {
    for (i = start; i < end; i++) {
        iterable[i] = value
    }
    return iterable
}



var array = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 5, 7: 6, length: 8 }

console.log(fill(array, 1, 2, 5))


