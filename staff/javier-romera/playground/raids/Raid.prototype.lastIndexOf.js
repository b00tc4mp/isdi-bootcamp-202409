var Raid = function () {
    this.length = 0
}

Raid.prototype.lastIndexOf = function (searchElement, fromIndex) {
    for (var i = (arguments.length === 1 || fromIndex >= this.length ? this.length - 1 :
        -this.length <= fromIndex && fromIndex < 0 ? fromIndex + this.length :
            fromIndex);
        i >= 0;
        i--) {
        if (this[i] === searchElement) {
            return i
        }
    }
    return - 1
}

console.log('TEST lastIndexOf')

console.log('CASE identify last position of Dodo')

var animals = new Raid
animals[0] = 'Dodo'
animals[1] = 'Tiger'
animals[2] = 'Penguin'
animals[3] = 'Dodo'
animals.length = 4
var animalA = animals.lastIndexOf('Dodo')

console.log(animals)
// Raid {0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4}
console.log(animalA)
// 3

console.log('CASE identify last position of Dodo with an index of 2')

animalB = animals.lastIndexOf('Dodo', 2)

console.log(animals)
// Raid {0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4}
console.log(animalB)
// 0