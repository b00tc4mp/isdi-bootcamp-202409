var Raid = function () {
    this.length
}

Raid.prototype.slice = function (start, end) {
    var newAnimals = { length: 0 }
    if (end === undefined) {
        end = this.length
    }
    for (var i = start; i < end; i++) {
        newAnimals[i - start] = this[i]
        newAnimals.length++
    }
    return newAnimals
}


console.log('TEST Raid.prototype.slice')

console.log('CASE slice elements from 2')

var animals = new Raid
animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'elephant'
animals.length = 5

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log('CASE slice elements from 2 to 4')

var animals = new Raid
animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'elephant'
animals.length = 5

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]
