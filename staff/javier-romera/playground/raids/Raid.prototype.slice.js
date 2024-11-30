var Raid = function () {
    //this.length = 0 No lo utlizo por ciertas condiciones del método slice
}

Raid.prototype.slice = function (startIndex, endIndex) {
    if (arguments.length === 0) { return this }

    var newRaid = new Raid

    if (startIndex < 0) {
        startIndex = this.length + startIndex
    }
    else if (startIndex >= this.length) {
        return newRaid
    }

    if (endIndex < -this.length) {
        endIndex = 0
    }
    else if (endIndex < 0) {
        endIndex = this.length + endIndex
    }

    if (endIndex <= startIndex) {
        return newRaid
    }

    newRaid.length = 0;
    for (var i = (!startIndex ? 0 : startIndex);
        i < (!endIndex ? this.length : endIndex);
        i++) {
        newRaid[newRaid.length] = this[i]
        newRaid.length++
    }
    return newRaid
}

console.log('TEST Raid.prototype.slice')

console.log('CASE slice animals with a start index')

var animals = new Raid
animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'elephant'
animals.length = 5

var slicedAnimals1 = animals.slice(2)

console.log(slicedAnimals1)
// Raid{0: 'camel', 1: 'duck', 2: 'elephant', length: 3}

console.log('CASE slice animals with a start and end index')

var slicedAnimals2 = animals.slice(1, 4)

console.log(slicedAnimals2)
// Raid{0: 'bison', 1: 'camel', 2: 'duck', length: 3}

console.log('CASE slice animals with negative indexes')

var slicedAnimals3 = animals.slice(3, -1)
var slicedAnimals4 = animals.slice(-4, 3)
var slicedAnimals5 = animals.slice(-5, -1)

console.log(slicedAnimals3)
// Raid{0: 'duck', length: 1}
console.log(slicedAnimals4)
// Raid{0: 'bison', 1: 'camel', length: 2}
console.log(slicedAnimals5)
// Raid{0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', length: 4}

console.log('CASE no index inputs')

var slicedAnimals6 = animals.slice()

console.log(slicedAnimals6)
// Raid {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5}

console.log('CASE start index >= array.length')

var slicedAnimals7 = animals.slice(10)

console.log(slicedAnimals7)
// Raid{}

console.log('CASE end index < -array.length')

var slicedAnimals8 = animals.slice(undefined, -10)

console.log(slicedAnimals8)
// Raid{0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5}

console.log('CASE end index >= start index')

var slicedAnimals9 = animals.slice(3, 3)

console.log(slicedAnimals9)
// Raid {}