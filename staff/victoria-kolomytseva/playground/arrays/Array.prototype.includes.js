console.log('Test Array.prototype.includes')

console.log('Case compare searchElement to elements of the array using the algorithm.')

var colores = ['rojo', 'verde', 'azul', 'amarillo', 'blanco']

console.log(colores.includes('rojo'))
//Expected output: true;


console.log('Test Array.prototype.includes')

console.log('Case compare searchElement with fromIndex to elements of the array using the algorithm.')

var colores = ['rojo', 'verde', 'azul', 'amarillo', 'blanco']

console.log(colores.includes('rojo', 1))
//Expected output: false;
