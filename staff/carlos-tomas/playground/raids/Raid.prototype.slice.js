var Raid = function () {
    this.length = 0
}

Raid.prototype.slice = function (startIndex, endIndex) {
    if (this.length <= 1) { return this }


    if (startIndex < 0) {
        startIndex = this.length + startIndex
    }
    else if (startIndex >= this.length) {
        return newObj
    }

    if (endIndex < -this.length) {
        endIndex = 0
    } else if (endIndex < 0) {
        endIndex = this.length + endIndex
    }
    if (endIndex <= startIndex) {
        return newObj
    }
    var newelement = {}
    newelement.length = 0
    for (var i = (!startIndex ? 0 : startIndex);
        i < (!endIndex ? this.length : endIndex);
        i++) {
        newelement[newelement.length] = this[i]
        newelement.length++

    }

    return newelement
}



console.log("TEST slice")

console.log("TEST delete values ​​from an index")

var animals = new Raid
animals[0] = "ant"
animals[1] = "bison"
animals[2] = "camel"
animals[3] = "duck"
animals[4] = "elephant"
animals.length = 5


var animal = animals.slice(2)

console.log(animal)

// Expected output: Array ["camel", "duck", "elephant", length: 3]


