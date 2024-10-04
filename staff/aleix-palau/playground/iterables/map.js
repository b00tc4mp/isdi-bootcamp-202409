var map = function (iterable, callback) {
    var obj = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        obj[i] = callback(iterable[i])
        obj.length++
    }

    return obj
}

console.log('TEST map')

console.log('CASE multiply the object times 2')

var obj1 = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }

// Pass a function to map
var map1 = map(obj1, function (num) {
    return num * 2
})

console.log(map1);
// { 0: 2, 1: 8, 2: 18, 3: 32, length: 4 }