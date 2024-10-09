var every = function(iterable, callback){
    for(var i = 0; i < iterable.length; i++){
        var element = iterable[i]
        if(callback(element))
            return true
    } 
    return false
}


console.log('CASE 1')

var nums = {0: 1, 1: 30, 2: 39, 3: 29, 4: 10, 5: 13, length: 6}

var condition = function(num){
    return num < 40
}

var condition2 = function(num){
    return num > 40
}

var result = every(nums, condition)
console.log(result)
// true

var result2 = every(nums, condition2)
console.log(result2)
// false