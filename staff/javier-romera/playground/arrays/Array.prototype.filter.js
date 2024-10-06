console.log('Array.prototype.filter')

console.log('CASE words with a length of bigger than 6')

var words = ['spray', 'elites', 'exuberant', 'destruction', 'present']

var result = words.filter(function (word) {
    return word.length > 6
})

console.log(result)
// (3) ['exuberant', 'destruction', 'present']

console.log('CASE numbers bigger or equal than 5')

var numbers = [3, 4, 5, 6, 7]

var result = numbers.filter(function (num) {
    return num >= 5
})

console.log(result)
// (3) [5, 6, 7]