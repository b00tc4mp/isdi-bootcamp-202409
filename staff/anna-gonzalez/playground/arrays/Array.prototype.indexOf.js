console.log('TEST Array.prototype.indexOf')

console.log('CASE locate the index of the value 8')

var numbers = [2, 4, 8, 16, 32, 8]
var indexOfEight = numbers.indexOf(8)
var indexOfTwenty = numbers.indexOf(20)
var indexOfEightFrom = numbers.indexOf(8, 3)

console.log(indexOfEight)
// 2
console.log(indexOfTwenty)
// -1
console.log(indexOfEightFrom)
// 5

console.log('CASE locate the index of pingu starting from index 1')

var animals = ["pingu", "hormiga", "delfin", "tejon de la miel", "pingu"]
var indexOfPinguFrom = animals.indexOf("pingu", 1)

console.log(indexOfPinguFrom)
// 4

console.log('CASE locate the index of Vancouver with fromIndex and without it')

var cities = ['Barcelona', 'Vancouver', 'Karlsruhe', 'Hospitalet', 'Vancouver']
var indexOfVancouver = cities.indexOf('Vancouver')
var indexOfVancouverFrom = cities.indexOf('Vancouver', 2)

console.log(indexOfVancouver)
// 1
console.log(indexOfVancouverFrom)
// 4