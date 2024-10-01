console.log('TEST Arrays.prototype.includes')

console.log('CASE check if includes an element')

var array1 = [1, 2, 3];
console.log(array1.includes(2));
// true

var pets = ['cat', 'dog', 'bat']
console.log(pets.includes('cat'))
// true

console.log('CASE check if does not include an element')

var array1 = [1, 2, 3];
console.log(array1.includes(4));
// false

var pets = ['cat', 'dog', 'bat']
console.log(pets.includes('at'))
// false

console.log('CASE check if includes an element fromIndex')

var array1 = [1, 2, 3];
console.log(array1.includes(2, 1));
// true

console.log('CASE check if includes a negative fromIndex')

var array1 = [1, 2, 3];
console.log(array1.includes(2, -2));
// true

var array1 = [1, 2, 3];
console.log(array1.includes(2, -1));
// false