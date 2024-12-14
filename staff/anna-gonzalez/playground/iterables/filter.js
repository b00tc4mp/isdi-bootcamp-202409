var filter = function (iterable, callback) {
    var wordsPortion = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        callback(element)
        if (callback(element)) {
            wordsPortion[wordsPortion.length - 1 + 1] = element
            wordsPortion.length++
        }
    }
    return wordsPortion
}

console.log('TEST filter')

console.log('CASE return the words longer than 6 characters from an iterable')

var words = { 0: 'spray', 1: 'elite', 2: 'exuberant', 3: 'destruction', 4: 'present', length: 5 }

var result = filter(words, function (word) { return word.length > 6 })

console.log(result)
// { 0: 'exuberant', 1: 'destruction', 2: 'present', length: 3 }