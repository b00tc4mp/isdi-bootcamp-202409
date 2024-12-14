//recorrer el iterable hasta el start indicado
//si start es negativo, recorrer desde el final
//  iterable.length + start
//CASO 2
//El return final es lo que eliminas y el array original queda modificado



var splice = function(iterable, start, deleteCount){
    var result = {length:0}
    if(start < 0){
        start = iterable.length + start
    }
    if(deleteCount === undefined || deleteCount >= iterable.length -)
    for(var i = 0; i < start; i++){
        var element = iterable[i]
        result[result.length] = element
        result.length++
    }
    if(deleteCount > ){
        for(var i = start; i < iterable.length - deleteCount; i++){
            element = iterable[i]
            removed[removed.length] = element
            removed.length++
        }
        return removed
    }
    
    return result
}


/*var splice = function(iterable, start, deleteCount){
    var result = {length:0}
    var removed = {length:0}
    if(start < 0){
        start = iterable.length + start
    }
    if(deleteCount > 0)
    for(var i = 0; i < start; i++){
        for(var j = start; j < iterable.length - deleteCount; j++)
        var element = iterable[i][j]
        result[result.length] = element
        result.length++
    }
    
    return result
}*/


// var splice = function(iterable, start, deleteCount){
//     var result = {length:0}
//     var removed = {length:0}
//     if(start < 0){
//         start = iterable.length + start
//     }
//     if(deleteCount === undefined){
//         for(var i = 0; i < start; i++){
//             if(removed === iterable[i]){
//             delete removed
//         }
//     }
//             var element = iterable[i]
//             result[result.length] = element
//             result.length++
//         }else{
//             for(var i = start; i < iterable.length - deleteCount; i++){
//             element = iterable[i]
//             removed[removed.length] = element
//             removed.length++
//         }
//         return removed
//     }
//     return result
// }

console.log('CASE an one argument (start)')

var months = {0:'Jan', 1:'March', 2:'April', 3: 'June', length: 4};
var result =splice(months, 3);
console.log(result)
//{0: 'Jan', 1: 'March', 2: 'April', length: 3}

console.log('CASE an two arguments, start and delete')

var months = {0:'Jan', 1:'March', 2:'April', 3: 'June', length: 4};
var removed = splice(months, 2, 1)
console.log(removed)
//{0: 'April', length: 1}
console.log(months)
//{0: 'Jan', 1: 'March', 2: 'June', length: 3}