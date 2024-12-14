console.log('TEST Array.prototype.filter')

console.log('CASE filter the elements')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var printWords = function(word){
    return word.length > 6
}
var result = words.filter(printWords);

console.log(result)
//["exuberant", "destruction", "present"]
