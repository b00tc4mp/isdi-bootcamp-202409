var map = function (iterable, callback) {
    var result = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        result[i] = callback(iterable[i]);
        result.length++
    }
    return result;
}

console.log('TEST map')

console.log('CASE return an iterable with the result of product each number per 20');

var evenNums = { 0: 2, 1: 4, 2: 6, 3: 8, length: 4 }
var product = function (num) {
    return num * 20;
}
var result = map(evenNums, product);
console.log(result);
// { 0: 40, 1: 80, 2: 120, 3: 160, length: 4 }

console.log('CASE return an iterable with the result of divide each number per 2');

var evenNums = { 0: 2, 1: 4, 2: 6, 3: 8, length: 4 }
var result = map(evenNums, function (num) { return num / 2 })
console.log(result);
// { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }
