var Raid = function () {
    this.length = 0
}

Raid.prototype.pop = function () {
    // almacenar el ultimo elemento en una variable
    var last = this[this.length -1]
    // eliminas el ultimo elemento 
    delete this[this.length -1]
    // disminuye la length
    this.length--
    // te devuelve el ultimo elemento 
    return last
}

var veggies = new Raid
veggies [0] = 'broccoli'
veggies [1] = 'cauliflower'
veggies [2] = 'cabbage'
veggies [3] = 'kale'
veggies [4] = 'tomato'
veggies.length = 5


var veggie = veggies.pop()
console.log(veggie)
console.log(veggies)