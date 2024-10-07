



console.log('Array.prototype.find')

console.log('find first greater than 10')

var nums = [5, 12, 8, 130, 44]
var found = nums.find(function (element) { return element > 10 });
console.log(found);
// 12

console.log('find first name with length lower than 3')

var names = ['Peter', 'Leo', 'Wendy', 'Io', 'Mark']
