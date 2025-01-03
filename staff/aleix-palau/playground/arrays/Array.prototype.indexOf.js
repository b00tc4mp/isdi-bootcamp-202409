console.log('TEST Array.prototype.indexOf')

console.log('CASE find where "bison" appears for the first time')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
var index = beasts.indexOf('bison')

console.log(index)
// 1


console.log('CASE find where "bison" appears for the first time starting from index 2')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
var index = beasts.indexOf('bison', 2)

console.log(index)
// 4


console.log('CASE find where "giraffe" appears for the first time')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
var index = beasts.indexOf('giraffe')

console.log(index)
// -1