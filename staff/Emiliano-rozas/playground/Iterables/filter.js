var words = { 0: 'spray', 1: 'elite', 2: 'exuberant', 3: 'destruction', 4: 'present', length: 5 };

var filter = function (iterable, callback) {
    var result = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        result[result.length] = callback(element)
        if (callback(element) === undefined) {
            delete callback(element)
        } else {
            result.length++
        }
    }
    return result
}


var longaniza = function (word) {
    if (word.length > 6) {
        return word
    }
}
var result = filter(words, longaniza);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"] en realidad no es un array es un ITERABLE




