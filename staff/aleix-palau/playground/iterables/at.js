var at = function (iterable, index) {
    if (index >= 0) {
        return iterable[index]
    } else {
        return iterable[iterable.length + index]
    }
}

console.log('TEST pop')

console.log('CASE find the item at index 2')

var object1 = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
var item = at(object1, 2)

console.log(item)
// 8


console.log('CASE find the item at index -2')

var object1 = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
var item = at(object1, -2)

console.log(item)
// 130


console.log('CASE find the item at index -6')

var object1 = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
var item = at(object1, -6)

console.log(item)
// undefined