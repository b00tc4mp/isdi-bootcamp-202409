console.log('TEST Array.protoype.join')
// Join es una función que junta los elementos del array en uno solo y lo divide por comillas, espacios o guion depende de cómo queremos.

var elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
//Expected output: "Fire,Air,Water"

console.log(elements.join(''));
//Expected output: "FireAirWater"

console.log(elements.join('-'));
//Expected output: "Fire-Air-Water"