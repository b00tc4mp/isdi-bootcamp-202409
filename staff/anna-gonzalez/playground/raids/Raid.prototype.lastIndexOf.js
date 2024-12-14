var Raid = function () {
    this.length = 0
}

Raid.prototype.lastIndexOf = function (searchElement, fromIndex) {
    if (-this.length <= fromIndex && fromIndex < 0) {
        fromIndex += this.length
    }
    // update fromIndex if it is out of the negative range
    else if (fromIndex < -this.length) {
        return -1
    }
    // create a fromIndex if it is bigger than the iterableLength or if there is no fromIndex
    else if (fromIndex >= this.length || arguments.length === 2) {
        fromIndex = this.length - 1
    }

    // go through iterable backwards
    for (var i = fromIndex; i >= 0; i--) {
        // return index if searchElement equals iterable[i]
        if (this[i] == searchElement) {
            return i
        }
    }
    //return -1 if searchElement not found
    return -1
}

console.log('TEST lastIndexOf')

console.log('CASE locate lastIndexOf dodo')

var animals = new Raid
animals[0] = 'dodo'
animals[1] = 'tiger'
animals[2] = 'penguin'
animals[3] = 'dodo'
animals.length = 4

var lastIndex = animals.lastIndexOf('dodo')

console.log(lastIndex)
// 3

console.log('CASE locate lastIndexOf tiger')

var animals = new Raid
animals[0] = 'dodo'
animals[1] = 'tiger'
animals[2] = 'penguin'
animals[3] = 'dodo'
animals.length = 4

var lastIndex = animals.lastIndexOf('tiger')

console.log(lastIndex)
// 1

console.log('CASE locate lastIndexOf penguin startFrom 1')

var animals = new Raid
animals[0] = 'dodo'
animals[1] = 'tiger'
animals[2] = 'penguin'
animals[3] = 'dodo'
animals.length = 4

var lastIndex = animals.lastIndexOf('penguin', 1)

console.log(lastIndex)
// -1

console.log('CASE locate lastIndexOf penguin startFrom -1')

var animals = new Raid
animals[0] = 'dodo'
animals[1] = 'tiger'
animals[2] = 'penguin'
animals[3] = 'dodo'
animals.length = 4

var lastIndex = animals.lastIndexOf('penguin', -1)

console.log(lastIndex)
// 2

console.log('CASE locate lastIndexOf penguin startFrom -50')

var animals = new Raid
animals[0] = 'dodo'
animals[1] = 'tiger'
animals[2] = 'penguin'
animals[3] = 'dodo'
animals.length = 4

var lastIndex = animals.lastIndexOf('penguin', -50)

console.log(lastIndex)
// -1

console.log('CASE locate lastIndexOf penguin startFrom 50')

var animals = new Raid
animals[0] = 'dodo'
animals[1] = 'tiger'
animals[2] = 'penguin'
animals[3] = 'dodo'
animals.length = 4

var lastIndex = animals.lastIndexOf('penguin', 50)

console.log(lastIndex)
// 2

console.log('CASE locate lastIndexOf raccoon')

var animals = new Raid
animals[0] = 'dodo'
animals[1] = 'tiger'
animals[2] = 'penguin'
animals[3] = 'dodo'
animals.length = 4

var lastIndex = animals.lastIndexOf('raccoon')

console.log(lastIndex)
// -1