console.log('TEST Array.prototype.join')

console.log('CASE join array with commas')

var elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// "Fire,Air,Water"

console.log('CASE join array without spaces')

var elements = ['Fire', 'Air', 'Water'];

console.log(elements.join(''));
// "FireAirWater"

console.log('CASE join array with hyphens')

var elements = ['Fire', 'Air', 'Water'];

console.log(elements.join('-'));
// "Fire-Air-Water"