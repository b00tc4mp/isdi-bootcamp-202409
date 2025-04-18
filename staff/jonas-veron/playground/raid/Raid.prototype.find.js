console.log('TEST Raid.prototype.find')

var Raid = function(){
    this.length = 0
}

Raid.prototype.find = function(callback){
    for(var i = 0; i < this.length; i++){
        var elemento = this[i]
    if(callback(elemento, i, this))
        return elemento
    }
}

console.log('CASE ')

var numbers = new Raid
numbers[0] = 5
numbers[1] = 10
numbers[2] = 15
numbers[3] = 20
numbers[4] = 25
numbers[5] = 30
numbers.length = 6

var printNumber = function(num){
    return num > 15
}

var result = numbers.find(printNumber)
console.log(result)