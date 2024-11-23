console.log('TEST Array.prototype.join')

console.log('CASE with no separator')

const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log('CASE with separator "-"')

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"