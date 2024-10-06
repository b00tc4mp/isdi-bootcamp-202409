console.log('TEST Array.prototype.lastIndexOf')

console.log('CASE identify last position of Dodo')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo']
animalA = animals.lastIndexOf('Dodo')
animalB = animals.lastIndexOf('Tiger')

console.log(animals)
// (4) ['Dodo', 'Tiger', 'Penguin', 'Dodo']
console.log(animalA)
// 3
console.log(animalB)
// 1

console.log('CASE identify last position of table')

var decorations = ['closet', 'chair', 'table', 'lamp', 'table']
var decor = decorations.lastIndexOf('table')

console.log(decorations)
// ['closet', 'chair', 'table', 'lamp', 'table']
console.log(decor)
// 4