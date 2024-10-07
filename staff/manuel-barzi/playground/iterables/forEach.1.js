var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        callback(element)
    }
}

console.log('TEST Array.prototype.forEach')

console.log('CASE print characters in iterable')

var chars = { 0: 'a', 1: 'b', 2: 'c', length: 3 }

// forEach(chars, function (element) { console.log(element) })
// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

var printElement = function (element) {
    console.log(element)
}

forEach(chars, printElement)