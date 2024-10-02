console.log('TEST Array.prototype.find')

//caso 1 (element 10)
console.log('CASE find element 10')
const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
// Expected output: 12

