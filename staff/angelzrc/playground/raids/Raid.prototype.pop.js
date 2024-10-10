var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.pop')
Raid.prototype.pop = function () {
    popItem = this[this.length -1]
    delete this[this.length -1]
    return popItem
}

console.log('CASE extract tomato from veggies')

var veggies = new Raid('broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato')
var veggie = veggies.pop()

console.log(veggies)

console.log(veggie)


console.log('CASE extracct yellow from colors')

var colors = new Raid('red', 'green', 'blue', 'yellow')
var color = colors.pop()

console.log(colors)
console.log(color)