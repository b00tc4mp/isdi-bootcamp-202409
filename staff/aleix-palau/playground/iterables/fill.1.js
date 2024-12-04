var fill = function (iterable, value) {
    for (var i = 0; i < iterable.length; i++) {
        iterable[i] = value
    }

    return iterable
}

console.log('TEST fill')

console.log('CASE fill the object with 6')

var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

console.log(fill(obj1, 6))