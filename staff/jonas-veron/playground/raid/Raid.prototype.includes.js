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

console.log('TEST raid includes an element fromIndex')

var Raid = function(){
    this.length = 0
}

Raid.prototype.includes = function(element, fromIndex){
    if(!fromIndex){
        fromIndex = 0
    }else if(fromIndex < 0){
        this.length = this.length + fromIndex
    }
    for(var i = fromIndex; i < this.length; i++){
        if(this[i] === element)
            return true
    }
    return false
}

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'd'
letters[4] = 'e'
letters[5] = 'c'
letters.length = 6

var result = letters.includes('c', -1)
console.log(result)
//true