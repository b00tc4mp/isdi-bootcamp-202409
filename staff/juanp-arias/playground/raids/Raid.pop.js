var Raid = function () {
    this.length = 0
}

Raid.prototype.pop = function () {
    var last = this[this.length - 1]
    delete this[this.length - 1]
    this.length--
    return last
}

//variable last es igual a this que significa este array en la posición -1 (es decir la última,//

var veggies = new Raid
veggies[0] = 'brócoli';
veggies[1] = 'cauliflower';
veggies[2] = 'cabbage';
veggies[3] = 'kale';
veggies[4] = 'tomato';
veggies.length = 5

var veggie = veggies.pop()

console.log(veggies)
console.log(veggie)
