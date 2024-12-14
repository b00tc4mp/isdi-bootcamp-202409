console.log('TEST Raid.prototype.includes')

var Raid = function(){
    this.length = 0
}

Raid.prototype.includes = function(element){
    for(var i = 0; i < this.length; i++){
        if(this[i] === element)
            return true
    }
    return false
}


console.log('TEST raid includes an element')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'd'
letters[4] = 'e'
letters[5] = 'f'
letters.length = 6

var result = letters.includes('c')
console.log(result)
//true

