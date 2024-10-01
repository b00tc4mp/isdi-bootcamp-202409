var Raid = function () {
    this.length = 0
}

Raid.prototype.pop = function () {

    var last = this[this.length - 1]
    delete this[this.length - 1]
    this.length--

    return last

}


var fruits = new Raid
fruits[0] = "banana"
fruits[1] = "apple"
fruits[2] = "coconut"
fruits[3] = "Kiwi"
fruits.length = 4


var fruit = fruits.pop()

console.log(fruits)
console.log(fruit)