console.log('TEST Raid.prototype.fill')

var Raid = function(){
    this.length = 0
}

Raid.prototype.fill = function(element){
    for(var i = 0; i < this.length; i++){
        this[i] = element
    }
    return this
}

console.log('CASE fill the whole array with x')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'd'
chars[4] = 'e'
chars.length = 5

var result =chars.fill('x')
console.log(result)
//{0: 'x', 1: 'x', 2: 'x', 3: 'x', 4: 'x', length: 5}


