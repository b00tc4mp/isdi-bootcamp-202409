function concat(itr1, itr2) {
    for (let i = 0; i < itr2.length; i++) {
        itr1[itr1.length] = itr2[i] //añadimos el elemento i de itr2 a itr1
        itr1.length++               //una vez añadido incrementamos el length
    } return itr1
}


console.log('TEST push')

console.log('CASE concat iterable1 with iterable2 and iterable3')

var iterable1 = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
}

var iterable2 = {
    0: 5,
    1: 6,
    2: 7,
    3: 8,
    length: 4
}

// concat(iterable1, iterable2)
// // OUTPUT ESPERADO iterable = {
//     0: 1,
//     1: 2,
//     2: 3,
//     3: 4,
//     4: 5,
//     5: 6,
//     6: 7,
//     7: 8,
//     length: 8
// }

console.log('CASE concat iterable1 with iterable2 and iterable3')

function concat1(itr1, ...iters) {
    for (let j = 1; j < arguments.length; j++) {
        for (let i = 0; i < arguments[j].length; i++) {
            itr1[itr1.length + i] = arguments[j][i] //añadimos el elemento j de itr a itr1
        }
        itr1.length = itr1.length + arguments[j].length               //incrementamos el length de itr1
    }
    return itr1
}

var iter1 = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}

var iter2 = {
    0: 4,
    1: 5,
    2: 6,
    length: 3
}

var iter3 = {
    0: 7,
    1: 8,
    2: 9,
    length: 3
}

var iter4 = {
    0: 10,
    1: 11,
    2: 12,
    length: 3
}

var iter5 = {
    0: 105,
    1: 156,
    2: 152,
    length: 3
}

var iter6 = {
    0: 10555,
    1: 15551,
    2: 15552,
    length: 3
}

let result = concat1(iter1, iter2, iter3, iter4, iter5, iter6)
console.log(result)
// // OUTPUT ESPERADO iter1 = {
//     0: 1,
//     1: 2,
//     2: 3,
//     3: 4,
//     4: 5,
//     5: 6,
//     6: 7,
//     7: 8,
//     8: 9,
//     length: 9
// }

