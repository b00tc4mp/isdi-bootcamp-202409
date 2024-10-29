console.log('TEST Array.prototype.join');

const elements = ['fuego', 'aire', 'agua'];

console.log(elements.join());
// "fuego,aire,agua"

console.log(elements.join(''));
// "fuegoaireagua"

console.log(elements.join('-'));
// "fuego-aire-agua"