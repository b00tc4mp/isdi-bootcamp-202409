var Raid = function () {
    this.length = 0
}

Raid.prototype.at = function (index) {
    // definir un indice
    // devolver el valor del mismo
    if (index > -1) {

        return this[Math.floor(index)]
    }
    else {
        return this[this.length + (Math.ceil(index))]
    }
}


var veggies = new Raid
veggies[0] = "Broccoli"
veggies[1] = "Cauliflower"
veggies[2] = "Cabbage"
veggies[3] = "Kale"
veggies[4] = "Tomato"
veggies.length = 5

var veggie = veggies.at(2)

console.log(veggie)
