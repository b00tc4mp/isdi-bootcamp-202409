//recorrer todo el iterable
//si el iterable coincide con el elemento return true, sino return false
var includes = function (iterable, element){
    for(i = 0; i < iterable.length; i++){
        if(iterable[i] === element){
            return true
        }
    }
    return false
}

console.log('CASE array includes element')

var letters = {0: 'a', 1: 'b', 2: 'c', length: 3};

var result = includes(letters, 'b');
console.log(result)
//true