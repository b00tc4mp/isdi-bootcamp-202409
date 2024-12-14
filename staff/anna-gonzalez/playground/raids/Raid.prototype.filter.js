Raid = function () {
    this.length = 0
}

Raid.prototype.filter = function (callback) {
    var wordsPortion = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        callback(element)
        if (callback(element)) {
            wordsPortion[wordsPortion.length - 1 + 1] = element
            wordsPortion.length++
        }
    }
    return wordsPortion
}

console.log('TEST Raid.prototype.filter')

console.log('CASE return the words longer than 6 characters from a Raid')

var words = new Raid
words[0] = 'spray'
words[1] = 'elite'
words[2] = 'exuberant'
words[3] = 'destruction'
words[4] = 'present'
words.length = 5

var result = words.filter(function (word) { return word.length > 6 })

console.log(result)
// { 0: 'exuberant', 1: 'destruction', 2: 'present', length: 3 }