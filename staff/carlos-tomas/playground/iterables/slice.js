var slice = function (iterable, startIndex, endIndex) {
    if (arguments.length <= 1) { return iterable }
    if (startIndex < 0) {
        startIndex = iterable.length + startIndex
    } else if (startIndex >= iterable.length) {
        return newObj
    }
    if (endIndex < -iterable.length) {
        endIndex = 0
    } else if (endIndex < 0) {
        endIndex = iterable.length + endIndex
    }
    if (endIndex <= startIndex) {
        return newObj
    }
    var newelement = {}
    newelement.length = 0
    for (var i = (!startIndex ? 0 : startIndex);
        i < (!endIndex ? iterable.length : endIndex);
        i++) {
        newelement[newelement.length] = iterable[i]
        newelement.length++

    }

    return newelement
}

console.log("TEST slice")

console.log("TEST delete values ​​from an index")

var animals = { 0: "ant", 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
var animal = slice(animals, 2,)

console.log(animal)

// Expected output: Array ["camel", "duck", "elephant"]


