console.log('TEST find method in object')

var find = function(iterable, callback){
    for(var i = 0; i < iterable.length; i++){
        var elemento = iterable[i]
        if(callback(elemento))
            return elemento
    }
}


console.log('CASE find the first element that matched and return the element')

var numbers = {
    0: 5,
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30,
    length: 6
}

var printNumber = function(num){
    return num > 15
}

var result = find(numbers, printNumber)
console.log(result)
//20