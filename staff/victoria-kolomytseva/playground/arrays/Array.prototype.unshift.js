console.log('Test de array.prototype.unshift')

console.log('CASE adds the specified elements to the beginning of an array1')

var array1 = ['victoria', 'sandra', 'marc', 'pablo']

console.log(array1.unshift('olga', 'juan'))
// Expected output: 6

console.log(array1)
// Expected 'olga', 'juan', 'victoria', 'sandra', 'marc', 'pablo'
