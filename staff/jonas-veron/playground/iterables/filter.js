console.log('TEST Array.prototype.filter')

var filter = function(iterable, callback){
    var result = {length:0}
    for(var i = 0; i < iterable.length; i++){
        var element = iterable[i]
        if(callback(element, i, iterable)){
            result[result.length] = element, i, iterable
            result.length++
        }
    }return result     
}

console.log('CASE filter the elements')

var words = {0: 'spray', 1: 'elite', 2: 'exuberant', 3: 'destruction', 4: 'present', length:5};

var printWords = function(word){
    return (word.length > 6)
}
var result = filter(words, printWords);

console.log(result)
//{0: 'exuberant', 1: 'destruction', 2: 'present', length: 3}
