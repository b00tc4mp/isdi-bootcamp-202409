console.log('TEST Raid.prototype.pop')

var Raid = function(){
}

Raid.prototype.pop = function(){
var last = this[this.length-1]
delete this[this.length-1]
this.length--
return last
}



console.log('CASE extract tomato from veggies')
var veggies = new Raid
veggies[0] = 'broccoli'
veggies[1] = 'cauliflower'
veggies[2] = 'cabbage'
veggies[3] = 'kale'
veggies[4] = 'tomato'
veggies.length = 5

console.log(veggies)
//Raid {0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5}

veggie = veggies.pop()
console.log(veggie)
//tomato



