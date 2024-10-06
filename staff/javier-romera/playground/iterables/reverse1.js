var reverse = function (iterable) {
    //Método con dos fors (menos óptimo)

    // var reversedObject = { length: 0 }
    // for (var i = iterable.length - 1; i > -1; i--) {
    //     reversedObject[reversedObject.length] = iterable[i]
    //     reversedObject.length++
    // }
    // for (var i = 0; i < reversedObject.length; i++) {
    //     iterable[i] = reversedObject[i]
    // }

    for (var i = 0; i < Math.floor(iterable.length / 2); i++) {
        var element = iterable[iterable.length - 1 - i]
        iterable[iterable.length - 1 - i] = iterable[i]
        iterable[i] = element
    }
    return iterable
}

console.log('CASE reverse numbers')

var numbers = { 0: 'one', 1: 'two', 2: 'three', 3: 'four', 4: 'five', length: 5 }
console.log(numbers)
// { 0: 'one', 1: 'two', 2: 'three', 3: 'four', 4: 'five', length: 5 }
var reversed = reverse(numbers)
console.log(reversed)
// {0: 'five', 1: 'four', 2: 'three', 3: 'two', 4:'one', length: 5}