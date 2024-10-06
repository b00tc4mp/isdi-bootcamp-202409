var indexOf = function (iterable, element, index) {
    if (index < -iterable.length || index >= iterable.length) {
        return -1
    }

    if (!index) {
        index = 0;
    }
    else if (index < 0) {
        index = iterable.length + index
    }

    for (index; index < iterable.length; index++) {
        if (iterable[index] === element) {
            return index
        }
    }
    return -1
}

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }
var beastA = indexOf(beasts, 'bison')
var beastB = indexOf(beasts, 'bison', 2)

console.log(beasts)
// ['ant', 'bison', 'camel', 'duck', 'bison']
console.log(beastA)
// 1
console.log(beastB)
// 4

console.log('CASE identify index of yellow')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var color = indexOf(colors, 'yellow')

console.log(colors)
// {0: 'red', 1: 'green', 2: 'blue', 3: 'yellow'}
console.log(color)
// 3