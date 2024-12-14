console.log('TEST Raid.prototype.lastIndexOf')

var Raid = function(){
    this.length = 0
}

Raid.prototype.lastIndexOf = function(element){
    for(var i = this.length-1; i >=0; i--){
        if(this[i] === element ){
            return i
        }
    }
    return -1
}

console.log('CASE extract the index of the element')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'd'
chars[4] = 'e'
chars[5] = 'f'
chars.length = 6

var index = chars.lastIndexOf('e')
console.log(index)
//4

