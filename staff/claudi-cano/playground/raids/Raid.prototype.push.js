var Raid = function () {
    this.length = 0
}


Raid.prototype.push = function () {
    // almacenar el último elemento de la variable
    var last = this[this.length - 1]
    // borra el útlimo elemento
    delete this[this.length - 1]
    // disminuye el length
    this.length--
    // te devuelve el mismo (último elemento)
    return last
}

console.log("TEST push")

console.log('CASE add banana to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana')

console.log(fruits)
// ['apple', 'orange', 'raspberry', 'pineapple', 'banana'] (5)
console.log(length)
// 5