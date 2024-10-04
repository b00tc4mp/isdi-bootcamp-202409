console.log('TEST Raid.prototype.fill')

var Raid = function(){
    this.length = 0
}
Raid.prototype.fill = function(element, fromIndex, endIndex){
    if(fromIndex === undefined){
        fromIndex = 0
    }
    if(fromIndex < 0){
        fromIndex += this.length
    }
    if(endIndex < 0){
        endIndex += this.length
    }
    if(endIndex === undefined){
        endIndex = this.length
    }
    for(var i = fromIndex; i < endIndex; i++){
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

var result = chars.fill('x')
console.log(result)
//{0: 'x', 1: 'x', 2: 'x', 3: 'x', 4: 'x', length: 5}

//CASE 2

console.log('CASE fill with fromIndex')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'd'
chars[4] = 'e'
chars.length = 5

var result = chars.fill('x', 2)
console.log(result)

//CASE 3

console.log('CASE fill x with fromIndex until end')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'd'
chars[4] = 'e'
chars.length = 5

var result = chars.fill('x', 2, 4) //4 no inclusive
console.log(result)
//{0: 'a', 1: 'b', 2: 'x', 3: 'x', 4: 'e', length: 5}

console.log('CASE fill x with negative arguments')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'd'
chars[4] = 'e'
chars.length = 5

var result = chars.fill('x', -3, -1)
console.log(result)
//{0: 'a', 1: 'b', 2: 'x', 3: 'x', 4: 'e', length: 5}

