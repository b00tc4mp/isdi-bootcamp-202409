console.log('TEST Array.prototype.filter')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
