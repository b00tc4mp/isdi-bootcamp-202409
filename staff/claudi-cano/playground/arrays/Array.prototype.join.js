console.log('TEST Array.prototype.join')

console.log('CASE concatenating all of the elements')

//The join() method of Array instances creates and returns a new string by concatenating all of the elements in this array

var elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"
