console.log('TEST Array.prototype.filter')

//caso 1 (element 10)
console.log('CASE filter element 13')
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

