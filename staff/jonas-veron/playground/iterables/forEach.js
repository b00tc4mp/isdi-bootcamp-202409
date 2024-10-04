var forEach = function (iterable, callback){
    for(i = 0; i < iterable.length; i++){
        var element = iterable[i]

        callback(element, i, iterable)
    }
}


console.log('TEST Array.prototype.forEach')

console.log('CASE print characters in iterable')

var chars = {0: 'a', 1: 'b', 2: 'c', length: 3}

var printElement = function(element) {
    console.log(element)
}

forEach(chars, printElement)
//'a'
//'b'
//'c'

console.log('CASE sum numbers from iterable')

var nums = {0: 100, 1: 200, 2: 300, length: 3}
var result = 0

var printElement = function(num){
    result += num
}

forEach(nums, printElement)
console.log(result)
//600