function concat() {
    var result = { length: 0 }

    for (var j = 0; j < arguments.length; j++) {
        var iterableX = arguments[j]

        for (var i = 0; i < iterableX.length; i++) {
            var element = iterableX[i]

            result[result.length] = element
            result.length++
        }
    }

    return result
}

var iter1 = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}

var iter2 = {
    0: 4,
    1: 5,
    2: 6,
    length: 3
}

var iter3 = {
    0: 7,
    1: 8,
    2: 9,
    length: 3
}

var iter4 = {
    0: 10,
    1: 11,
    2: 12,
    length: 3
}


console.log('CASE concat iterable1 with iterable2 and iterable3')

let final = concat(iter1, iter2, iter3, iter4)
console.log(final)
// // OUTPUT ESPERADO concat = {


