function fill(iterable, value, startIndex) {
    /*
       - Le das un valor al iterable 
       - cambias tus valores del indice (i) por tu valor
    */

    //CASO CAMBIAS TODOS LOS VALORES A PARTIR DE UN ÍNDICE CONCRETO
    for (var i = startIndex; i < iterable.length; i++) {
        iterable[i] = value
    }
    return iterable
}

console.log('TEST FILL')

console.log('CASE change nums index values to 2')

var nums = { 0: 1, 1: 2, 2: 3, length: 3 };
var num = fill(nums, 4, 1)
console.log(num)