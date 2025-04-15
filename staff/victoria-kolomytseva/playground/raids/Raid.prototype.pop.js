console.log('TEST Array.prototype.pop')

var Raid = function () {
    this.length = 0
}

Raid.prototype.pop = function () {
    //almacenar el ultimo elemento en variable
    var last = this[this.lengthn - 1]
    //eliminar el ultimo elemento
    delete this[this.lengthn - 1]
    //disminuye length
    this.length--
    // te devuelve el ultimo elemento
    return last

}


console.log('CASE extract tomato from veggies')
var veggies = new Raid
veggies[0] = 'broccoli'
veggies[1] = 'cauliflower'
veggies[2] = 'cabbage'
veggies[3] = 'kale'
veggies[4] = 'tomato';
veggies.length = 5

var veggie = veggies.pop('tomato')

console.log(veggies)
// Raid: {0:'broccoli', 1:'cauliflower', 2:'cabbage', 3:'kale', length: 4};
console.log(veggie)
// tomato

