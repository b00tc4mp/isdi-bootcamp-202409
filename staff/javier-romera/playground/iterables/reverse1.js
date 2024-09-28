var reverse = function (iterable) {
    var reversedObject = new Object
    var p = 0; //para asignarle las propiedades al nuevo objeto
    for (var i = iterable.length - 1; i >= 0; i--) {
        reversedObject[p] = iterable[i]
        p++
    }
    reversedObject.length = iterable.length
    for (var i = 0; i < reversedObject.length; i++) {
        iterable[i] = reversedObject[i]
    }
    return iterable
}

console.log('CASE reverse numbers')

var numbers = { 0: 'one', 1: 'two', 2: 'three', 3: 'four', 4: 'five', length: 5 }
console.log(numbers)

var reversed = reverse(numbers)
console.log(reversed)
// {0: 'five', 1: 'four', 2: 'three', 3: 'two', 4:'one', length: 5}
console.log(numbers)
// numbers has changed forever...