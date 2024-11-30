console.log('TEST Array.prototype.find')

console.log('CASE find first element bigger than 10 in numbers')

var numbers = [5, 12, 8, 130, 44]

//var found = numbers.find((element) => element > 10)

var found = numbers.find(function (element) {
    return element > 10
})

console.log(found)
// 12

console.log('CASE find an exact string')

var strings = ['awa', 'aga', 'awua', 'agua']

var foundString = strings.find(function (thestring) {
    return thestring === 'agua'
})

console.log(foundString)
// agua