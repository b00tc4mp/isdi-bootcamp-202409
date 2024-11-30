var map = function (iterable, callback) {
    var newObj = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        newObj[i] = callback(element)
        newObj.length++
    }
    return newObj
}

console.log('TEST map')

console.log('CASE multiply by 2')

var numbers = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }

var newNumbers = map(numbers, function (num) {
    return num * 2
})

console.log(newNumbers)
// {0: 2, 1: 4, 2: 6, 3: 8, 4: 10, length: 5}

console.log('CASE add zzz to string')

var stuff = { 0: 'hola', 1: 'que', 2: 'tal', length: 3 }

var newStuff = map(stuff, function (thestring) {
    return thestring + 'zzz'
})

console.log(newStuff)
// {0: 'holazzz', 1: 'quezzz', 2: 'talzzz', length: 3}