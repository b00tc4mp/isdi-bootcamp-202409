var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        callback(iterable[i]);
    }
}

console.log('TEST forEach')

console.log('CASE print characters in iterable');

var chars = { 0: 'a', 1: 'b', 2: 'c', length: 3 }

//forEach(chars, function (element) { console.log(element) })
// a
// b
// c

var printElement = function (element) {
    console.log(element);
}

forEach(chars, printElement);

console.log('CASE sum numbers from iterable')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var result = 0;

forEach(nums, function (num) {
    result += num
})
console.log(result);
// 600