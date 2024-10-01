var copyWithin = function (iterable, target, start, end) {
    var shallowCopy = { length: 0 }

    if (target >= iterable.length || start >= iterable.length) {
        return iterable
    }

    var target = (-iterable.length <= target && target < 0) ? target = target + iterable.length :
        (target < -iterable.length) ? 0 :
            target

    var start = (-iterable.length <= start && start < 0) ? start = start + iterable.length :
        (start < -iterable.length) ? 0 :
            start

    var end = (-iterable.length <= end && end < 0) ? end = end + iterable.length :
        (end >= iterable.length || !end) ? end = iterable.length :
            (end < -iterable.length) ? 0 :
                end

    if (end <= start) {
        return iterable
    }

    for (var i = start; i < end; i++) {
        shallowCopy[shallowCopy.length] = iterable[i]
        shallowCopy.length++
    }

    if (iterable.length < shallowCopy.length + target) {
        for (var i = 0; i < iterable.length - target; i++) {
            iterable[target + i] = shallowCopy[i]
        }
    } else {
        for (var i = 0; i < shallowCopy.length; i++) {
            iterable[target + i] = shallowCopy[i]
        }
    }

    return iterable
}

console.log('TEST copyWithin')

console.log('CASE copy to index 0 the element at index 3')

var object = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
var copyElement = copyWithin(object, 0, 3, 4)
console.log(copyElement);
// { 0: 'd', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy to index 0 the elements between index 2 and 4')

var object = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
var copyElement = copyWithin(object, 0, 2, 4)
console.log(copyElement);
// { 0: 'c', 1: 'd', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy to index 1 all elements from index 3 to the end')

var object = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
var copyElement = copyWithin(object, 1, 3)
console.log(copyElement);
// { 0: 'a', 1: 'd', 2: 'e', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy with negative indexes')

var object = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
var copyElement = copyWithin(object, -2, -3, -1)
console.log(copyElement);
// { 0: 'a', 1: 'b', 2: 'c', 3: 'c', 4: 'd', length: 5 }

console.log('CASE copy with target out of range')

var object = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
var copyElement = copyWithin(object, -2, -3, -1)
console.log(copyElement);
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy with target after start')

var object = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
var copyElement = copyWithin(object, 4, 0, 3)
console.log(copyElement);
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'a', length: 5 }