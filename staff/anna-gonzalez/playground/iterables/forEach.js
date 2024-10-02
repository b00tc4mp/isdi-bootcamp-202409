var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        callback(element)
    }
}

console.log('TEST Array.prototype.forEach')

console.log('CASE print characters in iterable')

var chars = { 0: 'a', 1: 'b', 2: 'c', length: 3 }

// var charsCallback = function (element) { console.log(element) }
// forEach(chars, charsCallback)
forEach(chars, (function (char) { console.log(char) }))

// "a"
// "b"
// "c"

console.log('CASE sum numbers from iterable')

var numbers = { 0: 100, 1: 200, 2: 300, length: 3 }
var result = 0

// var numbersCallback = function (element) { result = result + element }
// forEach(nums, numbersCallback)
forEach(numbers, (function (number) { result += number }))

console.log(result)
// 600