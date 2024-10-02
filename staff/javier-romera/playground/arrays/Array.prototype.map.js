console.log('TEST Array.prototype.map')

console.log('CASE multiply by 2')

var numbers = [1, 2, 3, 4, 5]

var newNumbers = numbers.map(function (num) {
    return num * 2
})

console.log(newNumbers)
// [2, 4, 6, 8, 10]

console.log('CASE add zzz to string')

var stuff = ['hola', 'que', 'tal']

var newStuff = stuff.map(function (thestring) {
    return thestring + 'zzz'
})

console.log(newStuff)