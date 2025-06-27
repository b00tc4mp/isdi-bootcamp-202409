var Raid = function () {
    this.length = 0;
}

Raid.prototype.pop = function () {
    var last = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return last
}

var veggies = new Raid
veggies[0] = "brocoli"
veggies[1] = "cauliflower"
veggies[2] = "cabbage"
veggies[3] = "kale"
veggies[4] = "tomato"
veggies.length = 5

var veggie = veggies.pop()







var Raid = function () {
    this.length = 0;
}

Raid.prototype.pop = function () {
    var element = this[this.length - 1]

    var deleted = element;
    delete deleted;
    this[this.length--];
    return deleted
}


var veggies = new Raid
veggies[0] = "brocoli"
veggies[1] = "cauliflower"
veggies[2] = "cabbage"
veggies[3] = "kale"
veggies[4] = "tomato"
veggies.length = 5

var veggie = veggies.pop()