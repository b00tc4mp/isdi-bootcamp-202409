console.log('TEST Array.prototype.findIndex')

console.log('CASE find first element bigger than 10 in numbers')

var numbers = [5, 12, 8, 130, 44]

//var found = numbers.find((element) => element > 10)

var found = numbers.findIndex(function (element) {
    return element > 10
})

console.log(found)
// 1

console.log('CASE find an exact string')

var strings = ['awa', 'aga', 'awua', 'agua']

var foundString = strings.findIndex(function (thestring) {
    return thestring === 'agua'
})

console.log(foundString)
// 3