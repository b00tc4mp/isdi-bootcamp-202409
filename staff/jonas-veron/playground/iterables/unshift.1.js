var unshift = function(iterable, element){
    for(var i = iterable.length; i >= 0; i--){
    iterable[i] = iterable[i-1]
    }
    iterable[0] = element
    iterable.length++
    return iterable.length
}


console.log('CASE add element at the start on array')
var obj = {0: 1, 1: 2, 2: 3, length: 3};
var length = unshift(obj, 'a');

console.log(length)
//4
console.log(obj)
//{0: 'a', 1: 1, 2: 2, 3: 3 length: 4}