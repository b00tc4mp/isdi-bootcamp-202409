function shift(iterable) {
    /*
        - Buscar el primer elemento del iterable y eliminarlo
        - reducir el length 
        */

    for (i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i]
    }
    delete iterable[iterable.length - 1]
    iterable.length--
    return iterable
}


console.log('TEST shift')

console.log('CASE eliminate index 0 value "1" and iterable3')

var iterable1 = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
}
let result = shift(iterable1)
console.log(result)
//EXPECTED OUTPUT 
/*var iterable1 = {
    0: 2,
    1: 3,
    2: 4,
    length: 3
}
*/

console.log('CASE eliminate index 0 value "1" and iterable3')

var iterable2 = {
    0: 5,
    1: 8,
    2: 9,
    3: 17,
    4: 91,
    length: 5
}
let result2 = shift(iterable2)
console.log(result2)
//EXPECTED OUTPUT 
/*var iterable1 = {
    0: 8,
    1: 9,
    2: 17,
    2: 91,
    length: 4
}
*/