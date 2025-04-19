var filter = function (iterable, callback) {
    var newObj = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        if (callback(element)) {
            newObj[newObj.length++] = element
        }
    }
    return newObj
}

console.log('TEST filter')

console.log('CASE words with a length of bigger than 6')

var words = { 0: 'spray', 1: 'elites', 2: 'exuberant', 3: 'destruction', 4: 'present', length: 5 }

var result = filter(words, function (word) {
    return word.length > 6
})

console.log(result)
// {0: 'exuberant', 1: 'destruction', 2: 'present', length: 3}

console.log('CASE numbers bigger or equal than 5')

var numbers = { 0: 3, 1: 4, 2: 5, 3: 6, 4: 7, length: 5 }

var result = filter(numbers, function (num) {
    return num >= 5
})

console.log(result)
// {0: 5, 1: 6, 2: 7, length: 3}