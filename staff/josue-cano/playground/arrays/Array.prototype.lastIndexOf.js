console.log('TeST ARRAY.protorype.lastIndexOf');

console.log('CASE ');

const paragraph = "prueba 2";

const searchTerm = '2';

console.log(`encontro ${searchTerm} is ${paragraph.lastIndexOf(searchTerm)}`,);

//-------------------------------------------------------------------------------


console.log('TEST Array.prototype.lastIndexOf')

console.log('CASE locate lastIndexOf dodo startFrom the end')

var animals = ['dodo', 'tiger', 'penguin', 'dodo']
var lastIndex = animals.lastIndexOf('dodo')
console.log(lastIndex)
// 3

console.log('CASE locate lastIndexOf tiger')

var animals = ['dodo', 'tiger', 'penguin', 'dodo']
var lastIndex = animals.lastIndexOf('tiger')
console.log(lastIndex)
// 1

console.log('CASE locate lastIndexOf penguin startFrom 1')

var animals = ['dodo', 'tiger', 'penguin', 'dodo']
var lastIndex = animals.lastIndexOf('penguin', 1)
console.log(lastIndex)
// -1

console.log('CASE locate lastIndexOf penguin startFrom -1')

var animals = ['dodo', 'tiger', 'penguin', 'dodo']
var lastIndex = animals.lastIndexOf('penguin', -1)
console.log(lastIndex)
// 2

console.log('CASE locate lastIndexOf penguin startFrom -50')

var animals = ['dodo', 'tiger', 'penguin', 'dodo']
var lastIndex = animals.lastIndexOf('penguin', -50)
console.log(lastIndex)
// -1

console.log('CASE locate lastIndexOf penguin startFrom 50')

var animals = ['dodo', 'tiger', 'penguin', 'dodo']
var lastIndex = animals.lastIndexOf('penguin', 100)
console.log(lastIndex)
// 2

console.log('CASE locate lastIndexOf raccoon')

var animals = ['dodo', 'tiger', 'penguin', 'dodo']
var lastIndex = animals.lastIndexOf('raccoon')
console.log(lastIndex)
// -1