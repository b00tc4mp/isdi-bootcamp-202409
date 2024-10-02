console.log('TEST Raid.prototype.indexOf')

var Raid = function(){
    this.length = 0
}

Raid.prototype.indexOf = function(element){
    for (var i = 0; i < this.length; i++){
        var result = this[i]
        if(result === element)
        return i
    }
}

console.log('TEST indexOf')
console.log('CASE get index of e')

var chars = new Raid

chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'd'
chars[4] = 'e'
chars[5] = 'f'
chars.length = 6

var char = chars.indexOf('e')
console.log(char)
//4

console.log('TEST when fromIndex is known')

Raid.prototype.indexOf = function(element, fromIndex){
    if(!fromIndex){
        fromIndex = 0
    } else if(fromIndex < 0){
        fromIndex = this.length + fromIndex
    }
    for (var i = fromIndex; i < this.length; i++){
        var result = this[i]
        if(result === element)
        return i
    }
    return -1
}

var chars = new Raid

chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'e'
chars[3] = 'd'
chars[4] = 'e'
chars[5] = 'f'
chars.length = 6

var char = chars.indexOf('e', -5)
console.log(char)
//2