var Raid = function () {
    this.length = 0
}

Raid.prototype.at = function (index) {
    if (index < 0) {
        index = index + this.length
    } else {
        return this[index]
    }
}


var veggies = new Raid
veggies[0] = "Brocoli"
veggies[1] = "Lettuce"
veggies[2] = "Tomato"
veggies[3] = "Cucumber"
veggies[4] = "Onion"
veggies.length = 5

var veggie = veggies.at()
console.log(veggie)
