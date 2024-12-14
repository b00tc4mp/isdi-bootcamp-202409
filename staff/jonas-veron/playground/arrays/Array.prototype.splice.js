console.log('TEST Array.prototype.splice')

//PARAMETROS

//si se pasa solo un parametro, el array se muestra solo hasta ese indice.

console.log('CASE an one argument (start)')

var months = ['Jan', 'March', 'April', 'June'];
var result months.splice(3);
//["Jan", "March", "April"]

console.log('CASE an two arguments, start and delete')

var months = ['Jan', 'March', 'April', 'June'];;
var removed = months.splice(2, 1);
console.log(removed)
//['April']
console.log(months)
//['Jan', 'March', 'June']