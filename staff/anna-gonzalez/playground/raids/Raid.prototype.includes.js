var Raid = function () {
    this.length = 0
}

Raid.prototype.includes = function (searchElement, fromIndex) {

    (fromIndex === undefined || fromIndex < -this.length) ? fromIndex = 0 :
        (fromIndex < 0 && -this.length <= fromIndex) ? fromIndex = fromIndex + this.length :
            (fromIndex >= this.length) ? false :
                fromIndex

    for (i = 0; i < this.length; i++) {
        if (this[fromIndex + i] === searchElement) {
            return true
        }
    }

    return false
}

console.log('TEST includes')

console.log('CASE check if includes an element')

var object1 = new Raid
object1[0] = 1
object1[1] = 2
object1[2] = 3
object1.length = 3

var objectCheck = object1.includes(2)
console.log(objectCheck);
// true

var pets = new Raid
pets[0] = 'cat'
pets[1] = 'dog'
pets[2] = 'bat'
pets.length = 3

var objectCheck = pets.includes('cat')
console.log(objectCheck)
// true

console.log('CASE check if does not include an element')

var object1 = new Raid
object1[0] = 1
object1[1] = 2
object1[2] = 3
object1.length = 3

var objectCheck = object1.includes(4)
console.log(objectCheck);
// false

var pets = new Raid
pets[0] = 'cat'
pets[1] = 'dog'
pets[2] = 'bat'
pets.length = 3

var objectCheck = pets.includes('at')
console.log(objectCheck)
// false

console.log('CASE check if includes an element fromIndex')

var object1 = new Raid
object1[0] = 1
object1[1] = 2
object1[2] = 3
object1.length = 3

var objectCheck = object1.includes(2, 1)
console.log(objectCheck);
// true

console.log('CASE check if includes a negative fromIndex')

var object1 = new Raid
object1[0] = 1
object1[1] = 2
object1[2] = 3
object1.length = 3

var objectCheck = object1.includes(2, -2)
console.log(objectCheck);
// true

var object1 = new Raid
object1[0] = 1
object1[1] = 2
object1[2] = 3
object1.length = 3

var objectCheck = object1.includes(2, -1)
console.log(objectCheck);
// false