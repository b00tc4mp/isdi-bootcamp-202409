console.log('TEST Array.prototype.includes');

console.log("CASE find last CAT");
var animals = ['Cat', 'Tiger', 'Penguin', 'Cat'];

console.log(animals.lastIndexOf('Cat'));
// Expected output: 3

console.log("CASE find the last tiger");
console.log(animals.lastIndexOf('Tiger'));
// Expected output: 1
