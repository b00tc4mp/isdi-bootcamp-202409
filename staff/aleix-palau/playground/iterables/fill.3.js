var fill = function (iterable, value, start, end) {
    if (arguments.length === 2) {
        for (var i = 0; i < iterable.length; i++) {
            iterable[i] = value
        }

        return iterable
    } else if (arguments.length === 3) {
        for (var i = start; i < iterable.length; i++) {
            iterable[i] = value
        }

        return iterable
    } else {
        for (var i = start; i < end; i++) {
            iterable[i] = value
        }

        return iterable
    }
}
console.log('TEST fill')

console.log('CASE fill the object with 6')

var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

console.log(fill(obj1, 6))

console.log('TEST fill')

console.log('CASE fill the object with 5 starting from index 1')

var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

console.log(fill(obj1, 5, 1))

console.log('CASE fill the object with 0 starting from index 1 and ending at index 4 exclusive')

var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

console.log(fill(obj1, 0, 2, 4))