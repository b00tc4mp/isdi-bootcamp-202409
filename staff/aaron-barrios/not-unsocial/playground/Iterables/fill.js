function fill(iterable, value, startIndex, endIndex) {
    /*
       - Le das un valor al iterable 
       - cambias tus valores del indice (i) por tu valor
    */

    //CASO CAMBIAS TODOS LOS VALORES A PARTIR DESDE UN STARTINDEX
    // HASTA UN LASTINDEX

    if (!startIndex && !endIndex) {
        startIndex = 0
        endIndex = iterable.length

        for (var i = startIndex; i < endIndex; i++) {
            iterable[i] = value
        }
    }
    else if (!endIndex) {
        endIndex = iterable.length

        for (var i = startIndex; i < endIndex; i++) {
            iterable[i] = value
        }
    }
    else {
        for (var i = startIndex; i < endIndex; i++) {
            iterable[i] = value
        }
    }


    return iterable
}
console.log('TEST FILL')

console.log('CASE change nums index values to 2')


console.log('CASE change nums index values to 8')
var nums = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6 };

var case1 = fill(nums, 8)
console.log(case1)

console.log('CASE change nums index values to 8 from index 3')
var nums2 = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6 };

var case2 = fill(nums2, 8, 3)
console.log(case2)

console.log('CASE change nums index values to 8 from index 0 until index 3')
var nums3 = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6 };

var case3 = fill(nums3, 8, 0, 3)
console.log(case3)
