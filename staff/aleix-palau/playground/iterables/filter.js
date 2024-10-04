var filter = function (iterable, callback) {
    for (i = 0; i < iterable.length; i++) {

    }
}

console.log('TEST filter')

console.log('CASE filter the object so that it only contains words larger than 6 letters')

var words = {
    0: 'spray',
    1: 'elite',
    2: 'exuberant',
    3: 'destruction',
    4: 'present',
    length: 5
}

var result = filter(words, function (word) {
    return word.length > 6
})

console.log(result)
// { 0: "exuberant", 1: "destruction", 2: "present", length: 3 }