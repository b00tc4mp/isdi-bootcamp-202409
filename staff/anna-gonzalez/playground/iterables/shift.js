var shift = function (iterable) {
    // copy first element so that we can return it at the end
    var firstElement = iterable[0]
    // remove first element
    delete iterable[0]
    // decrease the index of each element by 1
    for (i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i]
    }
    // decrease the total length by 1 if there is a length
    if (iterable.length > 0) {
        iterable.length--
    }
    //remove last position
    delete iterable[iterable.length]
    // returns the removed element
    return firstElement
}

console.log('TEST shift')

console.log('CASE extract 1 from iterable')

var iterable = { 0: 1, 1: 2, 2: 3, length: 3 }
var firstElement = shift(iterable)

console.log(iterable)
// { 0: 2, 1: 3, length: 2 }
console.log(firstElement)
// 1

console.log('CASE extract barcelona from iterable')

var iterable = { 0: 'barcelona', 1: 'cuenca', 2: 'hospitalet', 3: 'girona', 4: 'vancouver', length: 5 }
var firstElement = shift(iterable)

console.log(iterable)
// {  0: 'cuenca', 1: 'hospitalet', 2: 'girona', 3: 'vancouver', length: 4 }
console.log(firstElement)
// barcelona

console.log('CASE extract element from empty iterable')

var iterable = {}
var firstElement = shift(iterable)

console.log(iterable)
// {}
console.log(firstElement)
// undefined