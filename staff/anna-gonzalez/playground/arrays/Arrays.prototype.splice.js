console.log('TEST Arrays.prototype.splice')

console.log('CASE insert at index 1')

var months = ['Jan', 'March', 'April', 'June']
months.splice(1, 0, 'Feb')
console.log(months)
// ["Jan", "Feb", "March", "April", "June"]

console.log('CASE replace an element at index 4')

var months = ['Jan', 'March', 'April', 'June']
months.splice(4, 1, 'May')
console.log(months)
// ["Jan", "Feb", "March", "April", "May"]