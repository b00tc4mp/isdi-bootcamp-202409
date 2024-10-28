var concat = function(obj1,obj2){
    var result = {}
    for(var i = 0; i < obj1.length; i++){
        result[i] = obj1[i]   
}

for(var j = 0; j < obj2.length;++j ){
    result[i] = obj2[j]
    i++
}
    result.length = obj1.length + obj2.length;
    return result
}
var frutas = {
    0: 'kiwi',
    1: 'banana',
    2: 'mango',
    length: 3
}
var verduras = {
    0: 'brocoli',
    1: 'calabaza',
    length: 2
}
var bebidas = {
    0: 'agua',
    1: 'leche',
    length: 2
}

console.log(concat(frutas, verduras, bebidas))