var Raid = function () {
    this.length = 0
}

Raid.prototype.pop = function () {
    var last = this[this.length - 1]
    delete this[this.length - 1]
    this.length--
    return last
}

var veggies = new Raid
veggies[0] = 'broccoli'
veggies[1] = 'cauliflower'
veggies[2] = 'cabbage'
veggies[3] = 'kale'
veggies[4] = 'tomato'
veggies.length = 5

var veggie = veggies.pop()
console.log(veggies)
// { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', length: 4 }
console.log(veggie)
// tomato