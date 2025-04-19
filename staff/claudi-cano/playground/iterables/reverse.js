var reverse = function (iterable) {

    var iterable2 = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        iterable2[i] = element
        iterable2.length++
    }
    for (var i = iterable2.length - 1; i > -1; i--) {
        var element = iterable2[i]

        iterable[iterable.length - 1 - i] = element
    }
    return iterable
}



console.log('TEST reverse')

console.log('CASE reverses array of 2 elements')

var names = { 0: "Peter", 1: "John", length: 2 }
var reversed = names.reverse()
console.log(reversed)
// {0: "Peter", 1: "John", length: 2}
console.log(names === reversed)
// true











console.log('CASE reverses array of 3 elements')

var names = { 0: "Peter", 1: "John", 2: "Annita", length: 3 }
var reversed = names.reverse()
console.log(reversed)
// {0: "Annita", 1: "John", 2: "Peter", length: 3 }
console.log(names === reversed)
// true
