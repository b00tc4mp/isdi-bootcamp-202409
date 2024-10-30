var filter = function (iterable, callback) {
    var object = { length: 0 }

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        //llamo al callback y almaceno el elemento devuelto
        callback(element)
        if (callback(element)) {
            object[object.length] = iterable[i]
            object.length++
        }
    }
    return object
}

console.log('TEST Array.prototype.filter')


console.log('CASE filter words with length > 6')

var nums = { 0: 'spray', 1: 'elite', 2: 'exuberant', 3: 'destruction', 4: 'present', length: 5 }

var map1 = function (element) {
    if (element.length > 6) {
        return element.length > 6
    }
};

var final = filter(nums, map1)
console.log(final)
// { 0: 'exuberant', 1: 'destruction', 2: 'present', length: 3 }
