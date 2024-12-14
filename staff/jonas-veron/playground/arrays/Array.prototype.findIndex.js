console.log('TEST Array.prototype.findIndex')

console.log('CASE find the first element that matched and return the index')

var numbers = [5, 12, 8, 130, 44]

var printIndex = function(num){
    return num > 13
}

var result = numbers.findIndex(printIndex)
console.log(result)
//3