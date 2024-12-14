var Raid = function () {
    this.length = 0
}

Raid.prototype.reverse = function () {
    var newObject = { length: 0 }

    for (var i = this.length - 1; i > -1; i--) {
        var element = this[i]
        newObject[newObject.length] = element
        newObject.length++
    }

    return newObject
}

console.log('TEST Raid.prototype.at')

console.log('CASE get number at index 2 in numbers')

var object = new Raid
object[0] = 'one'
object[1] = 'two'
object[2] = 'three'
object[3] = 'four'
object[4] = 'five'
object.length = 5

var obj = object.reverse()
console.log(obj)
// ["five", "four", "three", "two", "one"]

