console.log("TEST Array.prototype.join");

console.log("CASE join array to string with comma")
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log("CASE join array into string with no extra character")
console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log("CASE join array into strin with a dash")
console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"
