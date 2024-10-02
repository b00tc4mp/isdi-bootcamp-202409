var Raid = function () {
    this.length = 0
}

Raid.prototype.filter = function (callback) {
    var newRaid = new Raid
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (callback(element)) {
            newRaid[newRaid.length++] = element
        }
    }
    return newRaid
}

console.log('TEST Raid.prototype.filter')

console.log('CASE words with a length of bigger than 6')

var words = new Raid
words[0] = 'spray'
words[1] = 'elites'
words[2] = 'exuberant'
words[3] = 'destruction'
words[4] = 'present'
words.length = 5

var result = words.filter(function (word) {
    return word.length > 6
})

console.log(result)
// Raid {0: 'exuberant', 1: 'destruction', 2: 'present', length: 3}

console.log('CASE numbers bigger or equal than 5')

var numbers = new Raid
numbers[0] = 3
numbers[1] = 4
numbers[2] = 5
numbers[3] = 6
numbers[4] = 7
numbers.length = 5

var result = numbers.filter(function (num) {
    return num >= 5
})

console.log(result)
// Raid {0: 5, 1: 6, 2: 7, length: 3}