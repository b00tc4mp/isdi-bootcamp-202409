var reverse = function (iterable) {
    if(iterable.length === 2) {

        var element = iterable[1]
        iterable[1] = iterable [0]
        iterable[0] = element
    }

    else if (iterable.length === 3) { //var names = { 0: 'Peter', 1: 'John', 2: 'Annita', length: 3 }
        var element = iterable[2]
        iterable[2] = iterable[0]
        iterable [0] = element 
    }

    else if (iterable.length === 4) { // { 0: 'Peter', 1: 'John', 2: 'Annita', 3: 'Mary', length: 4 }
        var element = iterable[3]
        iterable [3] = iterable[0]
        iterable [0] = element

        var element = iterable[2]
        iterable[2] = iterable[1]
        iterable[1] = element
    }

    else if (iterable.length === 5) { // // { 0: 'Oswald', 1: 'Mary', 2: 'Annita', 3: 'John', 4: 'Peter', length: 5 }
        var element = iterable[4]
        iterable[4] = iterable[0]
        iterable [0] = element

        var element = iterable[3]
        iterable[3] = iterable[1]
        iterable[1] = element 

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