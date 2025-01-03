var fill = function (iterable, value, start, end) {
    for (var i = (start === undefined ? 0 : start); i < (end === undefined ? iterable.length : end); i++) {
        iterable[i] = value
    }

    return iterable
}

console.log('TEST fill')

console.log('CASE fill the object with 6')

var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

console.log(fill(obj1, 6))
// { '0': 6, '1': 6, '2': 6, '3': 6, length: 4 }

console.log('TEST fill')

console.log('CASE fill the object with 5 starting from index 1')

var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

console.log(fill(obj1, 5, 1))
// { '0': 1, '1': 5, '2': 5, '3': 5, length: 4 }

console.log('CASE fill the object with 0 starting from index 1 and ending at index 4 exclusive')

var obj1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

console.log(fill(obj1, 0, 2, 4))
// { '0': 1, '1': 2, '2': 0, '3': 0, length: 4 }