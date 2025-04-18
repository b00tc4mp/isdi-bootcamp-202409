console.log('TEST Array.prototype.shift')


var array = ['banana', 'pear', 'kiwi','pineapple']
console.log(array)
//['banana', 'pear', 'kiwi','pineapple']

console.log('CASE delete the first element on array')
var extractElement = array.shift()
console.log(array)
//['pear', 'kiwi','pineapple']

console.log('and return the first element')
console.log(extractElement)
//banana