var Raid = function () {
    this.length = 0
}

Raid.prototype.pop = function () {
    var last = this[this.length - 1]

    delete this[this.length - 1]
    this.length--
    return last
}

console.log("TEST Raid.prototype.pop");

console.log("CASE extract tomato from veggies");

var veggies = new Raid
veggies[0] = "brocoli"
veggies[1] = "cauliflower"
veggies[2] = "cabbage"
veggies[3] = "kale"
veggies[4] = "tomato"
veggies.length = 5
var veggie = veggies.pop()

console.log(veggies);
// Raid {0: "brocoli", 1: "cauliflower", 2: "cabbage", 3: "kale", length: 4}
console.log(veggie);
// tomato

console.log("CASE extract yellow from colors")

var colors = new Raid
colors[0] = "red"
colors[1] = "green"
colors[2] = "blue"
colors[3] = "yellow"
colors.length = 4
var color = colors.pop()

console.log(colors)
// Raid {0: "red", 1: "green", 2: "blue", length: 3}
console.log(color)
// yellow