var Raid = function () {
    this.length = 0
}

Raid.prototype.lastindexOf = function (element, fromIndex) {
    var index = [fromIndex = undefined ? this.length - 1 : fromIndex < 0 ? fromIndex = fromIndex + (this.length) : this.length]
    for (var i = index; i >= 0; i--) {
        if (this[i] === element) {
            return i;
        }
    }
    return -1
}

var animals = new Raid
animals[0] = "Dodo"
animals[1] = "Tiger"
animals[2] = "Penguin"
animals[3] = "Beer"
animals.length = 4

var animal = animals.lastindexOf("Dodo")

console.log(animal)

//0

console.log(animals.lastindexOf("Tiger", -1))
//1

console.log(animals.lastindexOf("Beer", -2))

// -1 "No se encuentra"
