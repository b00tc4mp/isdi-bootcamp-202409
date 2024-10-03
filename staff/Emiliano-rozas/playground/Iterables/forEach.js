

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

var chars = { 0: 'a', 1: 'b', 2: 'c', length: 3 }

var printElement = function (element) {
    console.log(element)
}


var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        callback(element)
    }
}

forEach(chars, printElement)

// V2

var numbers = { 0: 100, 1: 200, 2: 300, length: 3 }
var result = 0;

var sum = function (num) {
    result += num
}


var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        callback(element)
    }
}

forEach(numbers, sum)
console.log(result)