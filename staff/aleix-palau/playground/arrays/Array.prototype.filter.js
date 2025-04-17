console.log('TEST Array.prototype.filter')

console.log('CASE filter the array so that it only contains words larger than 6 letters')

// creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = words.filter(function (word) {
    return word.length > 6
})

console.log(result)
// ["exuberant", "destruction", "present"]