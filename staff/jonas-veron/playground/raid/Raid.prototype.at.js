console.log('TEST Raid.prototype.at')

var Raid = function(){
    this.length = 0
}


var veggies = new Raid
veggies[0] = 'broccoli'
veggies[1] = 'cauliflower'
veggies[2] = 'cabbage'
veggies[3] = 'kale'
veggies[4] = 'tomato'
veggies.length = 5

var index = veggies.at('cabbage')
console.log(index)
//2


