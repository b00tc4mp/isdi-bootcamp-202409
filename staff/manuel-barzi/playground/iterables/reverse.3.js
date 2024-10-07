var reverse = function (iterable) {
    if (iterable.length === 2) {
        // iterable -> { 0: 'Peter', 1: 'John', length: 2 }
        // element -> John (iterable[1])
        // iterable -> { 0: 'Peter', 1: 'Peter', length: 2 }
        // iterable -> { 0: 'John', 1: 'Peter', length: 2 }

        var element = iterable[1]
        iterable[1] = iterable[0]
        iterable[0] = element
    } else if (iterable.length === 3) {
        // iterable -> { 0: 'Peter', 1: 'John', 2: 'Annita', length: 3 }
        // element -> Annita (iterable[2])
        // iterable -> { 0: 'Peter', 1: 'John', 2: 'Peter', length: 3 }
        // iterable -> { 0: 'Annita', 1: 'John', 2: 'Peter', length: 3 }

        var element = iterable[2]
        iterable[2] = iterable[0]
        iterable[0] = element
    }

    // iterable2 ->  { length: 0 }
    // iterable2 ->  { 0: 'Peter', length: 0 }
    // iterable2 ->  { 0: 'Peter', length: 1 }
    // iterable2 ->  { 0: 'Peter', 1: 'John', length: 1 }
    // iterable2 ->  { 0: 'Peter', 1: 'John', length: 2 }

    // iterable2 -> { 0: 'Peter', 1: 'John', length: 2 }
    // iterable -> { 0: 'John', 1: 'John', length: 2 }
    // iterable -> { 0: 'John', 1: 'Peter', length: 2 }

    // var iterable2 = { length: 0 }

    // for (var i = 0; i < iterable.length; i++) {
    //     var element = iterable[i]

    //     iterable2[i] = element
    //     iterable2.length++
    // }

    // for (var i = iterable2.length - 1; i > -1; i--) {
    //     var element = iterable2[i]

    //     iterable[iterable.length - 1 - i] = element
    // }


    // return iterable -> { 0: 'John', 1: 'Peter', length: 2 }
    return iterable
}

console.log('TEST reverse')

console.log('CASE reverses array of 2 elements')

var names = { 0: 'Peter', 1: 'John', length: 2 }
var reversed = reverse(names)
console.log(reversed)
// { 0: 'John', 1: 'Peter', length: 2 }
console.log(names === reversed)
// true

console.log('CASE reverses array of 3 elements')

var names = { 0: 'Peter', 1: 'John', 2: 'Annita', length: 3 }
var reversed = reverse(names)
console.log(reversed)
// { 0: 'Annita', 1: 'John', 2: 'Peter', length: 3 }
console.log(names === reversed)
// true

console.log('CASE reverses array of 4 elements')

var names = { 0: 'Peter', 1: 'John', 2: 'Annita', 3: 'Mary', length: 4 }
var reversed = reverse(names)
console.log(reversed)
// { 0: 'Mary', 1: 'Annita', 2: 'John', 3: 'Peter', length: 4 }
console.log(names === reversed)
// true