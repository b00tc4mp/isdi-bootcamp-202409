var Raid = function () {
    this.length = 0
}

Raid.prototype.slice = function (start, end) {

    var newAnimals = []

    var startValue =
        (start >= this.length) ? [] :
            (start < -this.length || start === undefined) ? 0 :
                (start < 0 && start > -this.length) ? start + this.length :
                    start

    var endValue =
        (end >= this.length || end === undefined) ? this.length :
            (end < -this.length) ? 0 :
                (-this.length <= end && end < 0) ? end + this.length :
                    (end < startValue) ? [] :
                        end

    for (var i = 0; i < endValue - startValue; i++) {
        newAnimals[i] = this[startValue + i]
    }

    return newAnimals
}

console.log('TEST slice')

console.log('CASE start index')

var animals = new Raid
animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'elephant'
animals.length = 5

var partOfAnimals = animals.slice(2)
console.log(partOfAnimals)
// ["camel", "duck", "elephant"]

console.log('CASE start and end index')

var animals = new Raid
animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'elephant'
animals.length = 5

var partOfAnimals = animals.slice(2, 4)
console.log(partOfAnimals)
// ["camel", "duck"]
var partOfAnimals2 = animals.slice(1, 5)
console.log(partOfAnimals2)
// ["bison", "camel", "duck", "elephant"]

console.log('CASE start negative index')

var animals = new Raid
animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'elephant'
animals.length = 5

var partOfAnimals = animals.slice(-2)
console.log(partOfAnimals)
// ["duck", "elephant"]

console.log('CASE end negative index')

var animals = new Raid
animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'elephant'
animals.length = 5

var partOfAnimals = animals.slice(2, -1)
console.log(partOfAnimals)
// ["camel", "duck"]