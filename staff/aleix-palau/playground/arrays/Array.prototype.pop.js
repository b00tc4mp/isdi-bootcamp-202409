console.log('TEST Array.prototype.pop')

console.log('CASE extract "tomato" from plants')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
var plant = plants.pop()

console.log(plants)
// ['broccoli', 'cauliflower', 'cabbage', 'kale']
console.log(plant)
// Expected output: 'tomato'