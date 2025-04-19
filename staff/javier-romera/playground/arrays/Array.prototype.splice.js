console.log('TEST Array.prototype.splice')

console.log('CASE deleting an item from the array (we only use start and deleteCount (MDN))')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(1, 1)

console.log(months)
// (3) ['Jan', 'April', 'June']

console.log('CASE deleting all elements after an index (we only use start)')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(2)

console.log(months)
// (2) ['Jan', 'March']

console.log('CASE delete 1 position and insert item1 (start, deleteCount, item1)')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(3, 1, 'May')

console.log(months)
// (4) ['Jan', 'March', 'April', 'May']

console.log('CASE delete position 1 and insert x (3) items (start, deleteCount, itemN)')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(1, 1, 'Feb', 'Sep', 'Oct')

console.log(months)
// (6) ['Jan', 'Feb', 'Sep', 'Oct', 'April', 'June']

console.log('CASE negative start and start > than -array.length')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(-3, 1)

console.log(months)
// (3) ['Jan', 'April', 'June']

console.log('CASE negative start and start < -array.length (we use 0 as start)')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(-100, 1)

console.log(months)
// (3) ['March', 'April', 'June']

console.log('CASE start >= array.length; in this case no matter how many items we try to delete, nothin will happen, but the function will work as an adding function')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(100, 40, 'Huh?')

console.log(months)
// (5) ['Jan', 'March', 'April', 'June', 'Huh?']

console.log('CASE no parameters')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice()

console.log(months)
// (4) ['Jan', 'March', 'April', 'June'] //Nothing changes

console.log('CASE deleteCount is omitted or deleteCount >= (start - array.length), then we just delete all the elements from the start parameter')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(3, 100, 'Huh...')

console.log(months)
// (4) ['Jan', 'March', 'April', 'Huh...']

console.log('CASE deleteCount is 0 or negative; it doesn\'t make sense to call the function like this without items')

var months = ['Jan', 'March', 'April', 'June']

console.log(months)
months.splice(3, -10, 'Huh!!')

console.log(months)
// (5) ['Jan', 'March', 'April', 'Huh!!', 'June']