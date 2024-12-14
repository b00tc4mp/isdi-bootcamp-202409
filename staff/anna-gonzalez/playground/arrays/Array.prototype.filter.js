console.log('TEST Array.prototype.filter')

console.log('CASE return the words longer than 6 characters from an array')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = words.filter(function (word) { return word.length > 6 })

console.log(result)
// ["exuberant", "destruction", "present"]