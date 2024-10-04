var pop = function (iterable) {

    var last = iterable[iterable.length - 1]

    delete iterable[iterable.length - 1]

    iterable.lenght--

    return last

}




console.log('CASE extract ')

var nombres = { 0: 'victoria', 1: 'alba', 3: 'maria', 4: 'rosana', 5: 'olga', length: 6 }
var nombre = nombres.pop(nombres)

console.log(nombres)
// 0:'victoria', 1: 'alba', 3: 'maria', 4: 'rosana', length: 5}
console.log(nombre)
//'olga'