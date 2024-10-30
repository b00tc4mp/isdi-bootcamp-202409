console.log('TEST function copyWithin on iterables')
var copyWithin = function (iterable, copyIndex, startIndex, endIndex) {
    if (copyIndex < 0) {
        copyIndex = copyIndex + iterable.length
    }

    if (startIndex < 0) {
        startIndex = startIndex + iterable.length
    } else if (startIndex === undefined) {
        startIndex = 0
        endIndex = iterable.length - copyIndex
    }

    if (endIndex < 0) {
        endIndex = endIndex + iterable.length
    } else if (endIndex === undefined) {
        endIndex = iterable.length
    }

    copiedPart = { length: 0 }
    for (var i = startIndex; i < endIndex; i++) {
        copiedPart[i - startIndex] = iterable[i]
        copiedPart.length++
    }
    for (var i = copyIndex; i < copyIndex + copiedPart.length; i++) {
        iterable[i] = copiedPart[i - copyIndex]
    }
    return iterable
}


var raid1 = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 };

console.log(copyWithin(raid1, 1, 4, 6));



