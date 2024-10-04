//recorrer el iterable hasta el start indicado
//si start es negativo, recorrer desde el final
//  iterable.length + start



var splice = function(iterable, start){
    var result = {length:0}
    for(var i = 0; i < start; i++){
        var element = iterable[i]
        result[result.length] = element
        result.length++
    }
    
    return result
}

console.log('CASE an one argument (start)')

var months = {0:'Jan', 1:'March', 2:'April', 3: 'June', length: 4};
var result =splice(months, 3);
console.log(result)
//["Jan", "March", "April"]