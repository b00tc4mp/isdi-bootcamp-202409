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
            iterable[target + 1] = shallowCopy[i]
        }
    }
    return iterable
}

console.log("TEST copyWithin")

console.log("CASE copy to index 0 the element at index 3")

var object = { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", length: 5 }
var copyElement = copyWithin(object, 0, 2)
console.log(copyElement);
// {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", length: 5}