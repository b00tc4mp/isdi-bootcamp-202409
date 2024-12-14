console.log('TEST Raid.prototype.at')

var Raid = function(){
    this.length = 0
}

//recorrer el objeto
//si el index es menor a 0 (this.length + index)


Raid.prototype.at = function(index){
    if(index < 0)
    index = this.length + index
    return this[index]
}

console.log('CASE with positive index')
var veggies = new Raid
veggies[0] = 'broccoli'
veggies[1] = 'cauliflower'
veggies[2] = 'cabbage'
veggies[3] = 'kale'
veggies[4] = 'tomato'
veggies.length = 5

var index = veggies.at(2)
console.log(index)
//'cabbage'


console.log('CASE with negative index')

var veggies = new Raid
veggies[0] = 'broccoli'
veggies[1] = 'cauliflower'
veggies[2] = 'cabbage'
veggies[3] = 'kale'
veggies[4] = 'tomato'
veggies.length = 5

var index = veggies.at(-2)
console.log(index)
//'kale'


