var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {

        callback(iterable[i])
    }
}

console.log('TEST forEach')

console.log('CASE sum the numbers in the object')

var nums = { 0: 5, 1: 4, 2: 5, length: 3 }
var sum = 0

forEach(nums, function (num) {
    sum += num
})

console.log(sum)
// 14