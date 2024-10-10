console.log("TEST findIndex")


var findIndex = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) { return i }
    }
    return -1
}


console.log("CASE compare array1 and element dando el indice")
var obj = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

var found = findIndex(obj, function (element) {
    return element > 44
})
console.log(found)
// Expected output: 3

var found = findIndex(obj, function (element) {
    return element === 12
})
console.log(found)
// Expected output: 1

var found = findIndex(obj, function (element) {
    return element < 12
})
console.log(found)
// Expected output: 0