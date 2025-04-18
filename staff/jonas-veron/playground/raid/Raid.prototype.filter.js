console.log('TEST Raid.prototype.filter')

var Raid = function(){
    this.length = 0
}

Raid.prototype.filter = function(callback){
    var result = {length:0}
    for(var i = 0; i < this.length; i++){
        var element = this[i]
    if(callback(element)){
        result[result.length] = element, i, this
        result.length++
        }
    }return result
}

console.log('CASE filter the elements')

var words = new Raid
words[0] = 'spray'
words[1] = 'elite'
words[2] = 'exuberant'
words[3] = 'destruction'
words[4] = 'present'
words.length = 5

var printWords = function(word){
    return (word.length > 6)
}

var result = words.filter(printWords)

console.log(result)
////{0: 'exuberant', 1: 'destruction', 2: 'present', length: 3}