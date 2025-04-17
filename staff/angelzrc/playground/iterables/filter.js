console.log('TEST filter function on iterables')

var filter = function (iterable, callback) {
    var result = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {

        if (callback(iterable[i])) {
            result[result.length] = iterable[i]
            result.length++
        }

    }
    return result
}

var words = { 0: 'spray', 1: 'elite', 2: 'exuberant', 3: 'destruction', 4: 'present', 5: 'cafe', 6: 'patatas', length: 7 };

var result = filter(words, (word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]