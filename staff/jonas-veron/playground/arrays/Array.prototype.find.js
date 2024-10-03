console.log('TEST Array.prototype.find')

console.log('CASE encontrar el primer elemento que coindida')

var numbers = [5, 10, 15, 20, 25, 30]

var printNumber = function(num){
    return num > 15
}

var result = numbers.find(printNumber)
console.log(result)
//20