var Raid = function () {
    this.length = 0
}

Raid.prototype.includes = function (searchElement, fromIndex) {
    if (!fromIndex) {
        fromIndex = 0
    } else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex
    }
    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] === searchElement) {
            return true
        }
    }
    return false
}

console.log('TEST Raid.prototype.includes')

console.log('CASE check if "cat" is in "pets" array')

var pets = new Raid
pets[0] = 'cat'
pets[1] = 'dog'
pets[2] = 'bat'
pets.length = 3

console.log(pets.includes('cat'))
// true

console.log('CASE check if "c" is in "obj" starting from index -2')

var obj = new Raid
obj[0] = 'a'
obj[1] = 'b'
obj[2] = 'c'
obj.length = 3

console.log(obj.includes("c", -2))
// true