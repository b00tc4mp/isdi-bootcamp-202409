var Raid = function () {
    this.length = 0
}

Raid.prototype.concat = function () {
    var result = new Raid

    for (var k = 0; k < this.length; k++) {
        result[result.length++] = this[k]
    }

    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            result[result.length++] = arguments[i][j]
        }
    }
    return result
}

console.log('TEST Raid.prototype.concat')

var object1 = new Raid
object1[0] = 1
object1[1] = 2
object1[2] = 3
object1.length = 3

var object2 = new Raid
object2[0] = 4
object2[1] = 5
object2[2] = 6
object2.length = 3

var object3 = new Raid
object3[0] = 7
object3[1] = 8
object3[2] = 9
object3.length = 3

var object4 = object1.concat(object2, object3)

console.log(object4)