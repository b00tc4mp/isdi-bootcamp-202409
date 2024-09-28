var indexOf = function (iterable, element) {
    if (!index) {
        index = 0;
    }
    else if (index < 0) {
        index = iterable.length + index
    }
    for (var i = 0; i < iterable.length; i++) {
        if (iterable[i] === element) {
            return i
        }
    }
    return -1
}

console.log('TEST Array.prototype.indexOf')

console.log('CASE identify index of bison')

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }
var beastA = indexOf(beasts, 'bison')
// var beastB = indexOf(beasts, 'bison', 2)

console.log(beasts)
// {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }
console.log(beastA)
// 1