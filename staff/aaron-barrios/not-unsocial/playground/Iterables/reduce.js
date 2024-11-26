var reduce = function (iterable, callback, initialValue) {

    if (!initialValue) {
        initialValue = iterable[0]
    }
    else if (!iterable[0]) {
        initialValue = iterable[1]
    }
    else {
        for (var i = 0; i < iterable.length; i++) {
            var element = iterable[i]

            callback(element)
        }
    }
}

console.log('TEST Array.prototype.reduce')

console.log('CASE sum values from iterable with 10')

var nums = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }
var initialValue = 10
var sumFunction = function (accumulator, currentValue) {
    return accumulator + currentValue;
}

var result = reduce(nums, sumFunction, initialValue)
console.log(result)
// 20