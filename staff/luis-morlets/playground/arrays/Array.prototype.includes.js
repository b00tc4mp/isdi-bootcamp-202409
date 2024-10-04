console.log('TEST Array.prototype.includes')

console.log('CASE check if 2 is included in nums')

var nums = [1, 2, 3];

console.log(nums.includes(2));
// Expected output: true

console.log('CASE check if cat is included in pets')

var pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

console.log('CASE check if at is included in pets')

console.log(pets.includes('at'));
// Expected output: false