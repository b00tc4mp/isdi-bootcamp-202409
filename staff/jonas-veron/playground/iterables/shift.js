//debemos extraer el primer elemento del array

var shift = function(iterable){
    var result = iterable[0]
    delete iterable[0]
    for(var i = 0; i < iterable.length; i++){
        iterable[i] = iterable[i+1]
    }
    delete iterable[iterable.length-1]
    iterable.length--
    return result
}


console.log('TEST Array.prototype.shift')


var obj = {0: 'banana', 1:'pear', 2:'kiwi', 3: 'pineapple', length: 4}
console.log(obj)
//{0: 'banana', 1:'pear', 2:'kiwi', 3: 'pineapple', length: 4}

console.log('CASE delete the first element on array')
var extractElement = shift(obj)
console.log(obj)
//{0:'pear', 1:'kiwi', 2: 'pineapple', length: 3}

console.log('and return the first element')
console.log(extractElement)
//banana