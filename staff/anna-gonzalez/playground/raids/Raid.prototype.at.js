var Raid = function () {
    this.length = 0
}

Raid.prototype.at = function (index) {
    if (index < -this.length || index >= this.length) {
        return 'Out of index'
    } else if (index < 0) {
        return this[this.length + Math.ceil(index)]
    } else {
        return this[Math.floor(index)]
    }
}

console.log('TEST Raid.prototype.at')

console.log('CASE get number at index 2 in numbers')

var numbers = new Raid
numbers[0] = 10
numbers[1] = 20
numbers[2] = 30
numbers[3] = 40
numbers[4] = 50
numbers.length = 5

var num = numbers.at(2)
console.log(num)
// 30

console.log('CASE get kale at index 3 in veggies')

var veggies = new Raid
veggies[0] = 'broccoli'
veggies[1] = 'cauliflower'
veggies[2] = 'cabbage'
veggies[3] = 'kale'
veggies[4] = 'tomato'
veggies.length = 5

var veggie = veggies.at(3)
console.log(veggie)
// kale

console.log('CASE get green at index -3 in colours')

var colours = new Raid
colours[0] = 'red'
colours[1] = 'green'
colours[2] = 'blue'
colours[3] = 'yellow'
colours.length = 4

var colour = colours.at(-3)
console.log(colour)
// green