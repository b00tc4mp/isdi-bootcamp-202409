


var Raid = function () {
    this.length = 0
}

Raid.prototype.pop = function () {

    var last = this[this.length - 1]
    // almacena le ultimo elemento de una variablec
    delete this[this.length - 1]
    // borra el utlimo elemento
    this.length--
    // disminuye el length
    return last
    // devuelve el utlimo elemento

}


console.log(veggies)

var veggies = new Raid
veggies[0] = 'brocoli';
veggies[1] = 'cauliflower';
veggies[2] = 'cabbage';
veggies[3] = 'kale';
veggies[4] = 'tomato';
veggies.length = 5;

var veggie = veggies.pop()
console.log(veggie)
console.log(veggies)



