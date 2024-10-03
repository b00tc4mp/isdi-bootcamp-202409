var reverse = function (iterable) {
    var newObject = { length: 0 }
    for (var i = iterable.length - 1; i > -1; i--) {
        var element = iterable[i]
        newObject[newObject.length] = element
        newObject.length++
    }
    iterable === newObject
    return iterable
}

console.log('TEST reverse')

console.log('CASE reverse an iterable')

object = { 0: 'one', 1: 'two', 2: 'three', length: 3 }

var reversed = reverse(object);
console.log(reversed);
// ["three", "two", "one"]
console.log(reversed === object)
// true

object2 = { 0: 'one', 1: 'two', 2: 'three', 3: 'four', 4: 'five', length: 5 }

var reversed2 = reverse(object2);
console.log(reversed2);
// "five", "four", "three", "two", "one"]
console.log(reversed2 === object2)
// true