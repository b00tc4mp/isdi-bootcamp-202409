console.log('TEST Array.prototype.indexOf')

console.log('CASE identify index of bison')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison']
var beastA = beasts.indexOf('bison')
var beastB = beasts.indexOf('bison', 2)

console.log(beasts)
// ['ant', 'bison', 'camel', 'duck', 'bison']
console.log(beastA)
// 1
console.log(beastB)
// 4

console.log('CASE identify index of yellow')

var colors = ['red', 'green', 'blue', 'yellow']
var color = colors.indexOf('yellow')

console.log(colors)
// ['red', 'green', 'blue', 'yellow']
console.log(color)
// 3