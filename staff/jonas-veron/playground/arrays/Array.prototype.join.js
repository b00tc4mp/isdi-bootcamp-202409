console.log('TEST Array.prototype.join')




var elements = ['Fire', 'Air', 'Water'];

console.log('CASE argument undefined')

console.log(elements)
//['Fire', 'Air', 'Water']

var str = elements.join()
console.log(str);
//"Fire,Air,Water"







console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"