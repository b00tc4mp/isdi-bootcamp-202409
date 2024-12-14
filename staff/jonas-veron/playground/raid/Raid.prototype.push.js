console.log('TEST Raid.prototype.push')

var Raid = function (){
    this.length = 0
}

Raid.prototype.push = function (){
    for(var i = 0; i < arguments.length; i++){
        this[this.length] = arguments[i]
        this.length++
    }
    return this.length
}

console.log('CASE add banana to fruits')

var fruits = new Raid
fruits[0] = 'apple'
fruits[1] = 'pineapple'
fruits[2] = 'raspberry'
fruits[3] = 'orange'
fruits.length = 4

var length = fruits.push('banana');

console.log(fruits);
// Raid: { 0: 'apple', 1: 'pineapple', 2: 'raspberry', 3: 'orange', 4: 'banana', length: 5 }

console.log(length);