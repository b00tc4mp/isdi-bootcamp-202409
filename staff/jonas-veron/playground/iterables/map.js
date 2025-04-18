var map = function (iterable, callback){
    var result = {length:0}
    for(var i = 0; i < iterable.length; i++){
        var element = iterable[i]
        result[result.length] = callback(element, i, iterable)
        result.length++
    }
    return result
}

console.log('TEST Array.prototype.map')

console.log('CASE pass a function to map')

var nums = {0: 1, 1: 4,2: 9, 3: 16, length: 4}

// Pass a function to map

var res = map(nums, function(number){
return number * 2
})

console.log(res)

console.log(nums === res)

// {0: 2, 1: 8, 2: 18, 3: 32, length: 4}