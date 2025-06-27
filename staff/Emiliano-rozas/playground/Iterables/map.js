// Pass a function to map
var map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]

var nums = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 };

var map = function (iterable, callback) {

    for (var i = 0; i < iterable.length; i++) {
        var result = { length: 0 };
        var multiply = 0;
        callback(iterable[i])
        result[result.length] = multiply
        result.length++


    }
    return result
}
var operation = function (num) {
    multiply = (num * 2)
}
map(nums, operation)
console.log(result)



var nums = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 };

var map = function (iterable, callback) {
    var result = { length: 0 };

    for (var i = 0; i < iterable.length; i++) {
        result[result.length] = callback(iterable[i])
        result.length++
    }

    return result
}

var operation = function (num) {
    return num * 2
}

map(nums, operation)
console.log(result)


