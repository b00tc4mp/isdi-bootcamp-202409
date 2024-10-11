


console.log('TEST Array.prototype.join')

console.log('CASE join elements')

var elements = ['Fire', 'Air', 'Water', 'Earth']
var joined = elements.join()
console.log(joined)
// 'Fire,Air,Water,Earth'

console.log('CASE join elements with #')

var elements = ['Fire', 'Air', 'Water', 'Earth']
var joined = elements.join('#')
console.log(joined)
// 'Fire#Air#Water#Earth'