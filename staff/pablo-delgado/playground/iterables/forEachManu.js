var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        callback(element)
    }
}

var chars = { 0: 'a', 1: 'b', 2: 'c', length: 3 }

forEach(chars, function (element) { console.log(element) })

/////
console.log('CASE sum nºs from iterable')

var nums = [100, 200, 300]
var result = 0

nums.forEach(function (num) {
    result += num
})

console.log(result)


/// lo cambiamos a iterables

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var result = 0

forEach(nums, function (num) {
    result += num
})

console.log(result)