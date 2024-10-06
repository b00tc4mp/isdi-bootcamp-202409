var fill = function (iterable, element, fromIndex, endIndex) {
    if (fromIndex < 0) {
        fromIndex += iterable.length // fromIndex = fromIndex + iterable.length
    }
    if (endIndex < 0) {
        endIndex += iterable.length
    }

    if (fromIndex >= iterable.length) {
        return iterable
    }
    if (endIndex <= fromIndex) {
        return iterable
    }

    for (var i = !fromIndex || fromIndex < -iterable.length ? 0 : fromIndex;
        i < (!endIndex || endIndex >= iterable.length ? iterable.length : endIndex);
        i++) {
        iterable[i] = element
    }
    return iterable
}

console.log('TEST fill')

console.log('CASE fill entire iterable with 6')

var iterable1 = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }
console.log(iterable1)

console.log(fill(iterable1, 6))
// { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, length: 5 }

console.log('CASE fill array from a starting position')

console.log(fill(iterable1, 5, 3))
//{0: 6, 1: 6, 2: 6, 3: 5, 4: 5, length: 5}

console.log('CASE fill array from a starting position to an end position')

console.log(fill(iterable1, 9, 1, 3))
// {0: 6, 1: 9, 2: 9, 3: 5, 4: 5, length: 5}