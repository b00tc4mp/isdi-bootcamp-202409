function concat(iterables) {
    var newObj = new Object
    var p = 0; //variable que asigna las propiedas del nuevo objeto
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            newObj[p] = arguments[j][i]
            p++
        }
    }
    newObj.length = p
    return newObj
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


console.log('CASE concat iterable1 with iterable2 and iterable3')

let result = concat(iter1, iter2, iter3, iter4)
console.log(result)
// // OUTPUT ESPERADO concat = {


