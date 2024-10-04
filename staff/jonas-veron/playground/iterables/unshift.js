var unshift = function(iterable){
    for(var j = arguments.length - 1; j > 0; j--){
        for(var i = iterable.length; i >= 0; i--){
        iterable[i] = iterable[i-1]
        }
        iterable[0] = arguments[j]
        iterable.length++
    }
    return iterable.length
}


console.log('CASE add element at the start on obj')
var obj = {0: 1, 1: 2, 2: 3, length: 3};
var length = unshift(obj, 'a');

console.log(length)
//4
console.log(obj)
//{0: 'a', 1: 1, 2: 2, 3: 3 length: 4}

console.log('CASE add two elements at the start on obj')
var obj1 = {0: 1, 1: 2, 2: 3, length: 3}
var length1 = unshift(obj1, 'a', 'b')
console.log(obj1)

console.log(length1)
//{0: 'a', 1: 'b', 2: 1, 3: 2, 4: 3, length: 5}
