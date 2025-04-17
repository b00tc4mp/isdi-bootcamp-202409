var reverse = function (iterable) {
    var tempObj = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        tempObj[i] = iterable[iterable.length - 1 - i]
        tempObj.length++
    }

    for (var i = 0; i < iterable.length; i++) {
        iterable[i] = tempObj[i]
    }

    return iterable
}

console.log('TEST reverse')

console.log('CASE reverse obj1')

var obj1 = { 0: 'one', 1: 'two', 2: 'three', length: 3 }

var reversed = reverse(obj1)
console.log(reversed)
// { 0: 'three', 1: 'two', 2: 'one', length: 3 }