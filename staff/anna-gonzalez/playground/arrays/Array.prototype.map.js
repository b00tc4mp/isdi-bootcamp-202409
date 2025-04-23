console.log('TEST Array.prototype.map')

console.log('CASE multiply numbers in array')

var numbers = [1, 4, 9, 16]

numbers.map(function (number) { return number * 2 })
// [2, 8, 18, 32]

console.log('CASE return first letter of names in array')

var names = ['Javier', 'Claudi', 'Aaron', 'Emiliano']

names.map(function (name) { return name[0] })
// ['J', 'C', 'A']