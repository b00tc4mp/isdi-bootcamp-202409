var indexOf = function (iterable, searchelement, fromIndex) {
    for (
        var i = (arguments.length === 2 ? 0 : (fromIndex >= 0 ? fromIndex : fromIndex + iterable.length));
        //la variable i es igual a: si es estrictamente igual a 2 (es decir carece de un argumento) debe devolver 0, 2. si es mayor o igual a 0 el valor será el que hay en fromIndex, sino, será  el valor de fromIndex más la longitud del iterable (el grupo de elementos))
        i < iterable.length; //si el vaor de i es menor a la longitud del array aplica función de abajo.
        i++
    ) {
        var element = iterable[i] //la variable element es igual al iterable elemento que hay en chars posición(i)
        if (element === searchelement) return i
        //si la variable element es estrictamente igual al elemento en la posición i devuelve index (posición)
    }
    return -1


}
console.log('TEST indexOf')

console.log('CASE get index of c')

var chars = { 0: 'a', 1: 'b', 2: 'c', 3: 'b', 4: 'a', length: 5 }

var index = indexOf(chars, 'c')
console.log(index)
// 2

console.log('CASE get index of c from index -2')

var chars = { 0: 'a', 1: 'b', 2: 'c', 3: 'b', 4: 'a', length: 5 }

var index = indexOf(chars, 'c', -2)
console.log(index)
// -1