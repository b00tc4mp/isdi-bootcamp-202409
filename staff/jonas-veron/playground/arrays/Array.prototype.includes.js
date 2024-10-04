console.log('TEST array.prototype.includes')

console.log('CASE array includes element')

var letters = ['a', 'b', 'c'];

var result = letters.includes('b');
console.log(result)
//true

console.log('CASE array includes element fromIndex')

var letters1 = ['a', 'b', 'c', 'd', 'e'];

var result1 = letters1.includes('d', 2)
console.log(result1)
//true