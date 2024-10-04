var splice = function (iterable, start) {
    var extracted = { length: 0 }

    for (var i = start; i < iterable.length; i++) {
        var element = iterable[i]
        delete iterable[i]

        extracted[extracted.length] = element
        extracted.length++
    }
    iterable.length -= extracted.length

    return extracted
}

console.log('TEST splice')

console.log('CASE extract elements from index 3')

var numbers = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600, 6: 700, length: 7 }
var extracted = splice(numbers, 3)
console.log(numbers)
// { 0: 100, 1: 200, 2: 300, length: 3 }
console.log(extracted)
// { 0: 400, 1: 500, 2: 600, 3: 700, length: 4 }