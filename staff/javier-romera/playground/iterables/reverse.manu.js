var reverse = function (iterable) {
    for (var i = iterable.length - 1; i >= Math.floor(iterable.length / 2); i--) {
        var element = iterable[i]
        iterable[i] = iterable[iterable.length - 1 - i]
        iterable[iterable.length - 1 - i] = element
    }

    return iterable
}

console.log('TEST reverse')

console.log('CASE reverses iterable of 2 elements')

var names = { 0: 'Peter', 1: 'John', length: 2 }
var reversed = reverse(names)
console.log(reversed)
// { 0: 'John', 1: 'Peter', length: 2 }
console.log(names === reversed)
// true

console.log('CASE reverses iterable of 3 elements')

var names = { 0: 'Peter', 1: 'John', 2: 'Annita', length: 3 }
var reversed = reverse(names)
console.log(reversed)
// { 0: 'Annita', 1: 'John', 2: 'Peter', length: 3 }
console.log(names === reversed)
// true

console.log('CASE reverses iterable of 4 elements')

var names = { 0: 'Peter', 1: 'John', 2: 'Annita', 3: 'Mary', length: 4 }
var reversed = reverse(names)
console.log(reversed)
// { 0: 'Mary', 1: 'Annita', 2: 'John', 3: 'Peter', length: 4 }
console.log(names === reversed)
// true

console.log('CASE reverses iterable of 5 elements')

var names = { 0: 'Peter', 1: 'John', 2: 'Annita', 3: 'Mary', 4: 'Oswald', length: 5 }
var reversed = reverse(names)
console.log(reversed)
// { 0: 'Oswald', 1: 'Mary', 2: 'Annita', 3: 'John', 4: 'Peter', length: 5 }
console.log(names === reversed)
// true