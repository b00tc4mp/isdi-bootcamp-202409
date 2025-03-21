console.log('TEST Array.prototype.includes')


console.log('CASE check -2- value')
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true

console.log('CASE check -cat- value')
const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

console.log('CASE check -at- value')
console.log(pets.includes('at'));
// Expected output: false
