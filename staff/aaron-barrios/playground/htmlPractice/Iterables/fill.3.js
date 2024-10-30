function fill(iterable, value, startIndex, endIndex) {
    /*
       - Le das un valor al iterable 
       - cambias tus valores del indice (i) por tu valor
    */

    //CASO CAMBIAS TODOS LOS VALORES A PARTIR DESDE UN STARTINDEX
    // HASTA UN LASTINDEX
    for (var i = startIndex; i < endIndex; i++) {
        iterable[i] = value
    }
    return iterable
}

console.log('TEST FILL')

console.log('CASE change nums index values to 2')

var nums = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6 };
var num = fill(nums, 8, 0, 3)
console.log(num)