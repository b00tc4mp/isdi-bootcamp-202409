var splice = function (iterable, start, deleteCount) {
    var splicedIterable = new Object

    splicedIterable.length = 0
    var wasDeleteCountAssigned = true
    if (!deleteCount) {
        deleteCount = iterable.length - start
        wasDeleteCountAssigned = false
    }
    else if (deleteCount > iterable.length - start) {
        deleteCount = iterable.length - start
    }

    // Almacenamos los valores que vamos a borrar en el nuevo objeto
    for (var i = start; i < start + deleteCount; i++) {
        splicedIterable[splicedIterable.length] = iterable[i]
        splicedIterable.length++
        delete iterable[i]
    }

    // Parte de ajustar las posiciones del objeto después de borrar
    if (wasDeleteCountAssigned) {
        for (var i = 0; i < deleteCount; i++) {
            for (var i = start + 1; i < iterable.length; i++) {
                iterable[i - 1] = iterable[i]
            }
            iterable.length--
            delete iterable[iterable.length]
        }
    } else {
        for (var i = 0; i < deleteCount; i++) {
            iterable.length--
        }
    }

    // Toca añadir los objetos
    if (arguments.length >= 3) {

        // for (var i = iterable.length; i >= start; i--) {
        //     iterable[i] = iterable[i - 1]
        // }
        // iterable.length++
        // iterable[start] = arguments[3]

        for (var i = 0; i < arguments.length - 3; i++) {
            for (var j = iterable.length; j >= start; j--) {
                iterable[j] = iterable[j - 1]
            }
            // iterable[start + i] = arguments[3 + i]
            iterable.length++
        }
        for (var i = 0; i < arguments.length - 3; i++) {
            iterable[start + i] = arguments[3 + i]
        }
    }

    delete iterable[iterable.length]
    return splicedIterable
}

console.log('TEST splice')

console.log('CASE deleting an item from the array (we only use start and deleteCount (MDN))')

var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }

console.log(months)
var spliced = splice(months, 1, 1) //start index 1, delete 1
console.log(months)
// {0: 'Jan', 1: 'April', 2: 'June', length: 3}
console.log(spliced)
// {0: March, length: 1}

console.log('CASE deleting all elements after an index (we only use start)')

var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }

console.log(months)
var spliced = splice(months, 2) //start index 2, delete all
console.log(months)
// {0: 'Jan', 1: 'March', length: 2}
console.log(spliced)
// {0: 'April', 1: 'June', length: 2}

console.log('CASE delete 1 position and insert item1 (start, deleteCount, item1)')

var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }

console.log(months)
var spliced = splice(months, 3, 1, 'May')
console.log(months)
// {0: 'Jan', 1: 'March', 2: 'April', 3: 'May', length: 4}
console.log(spliced)
// {0: 'June', length: 1}

console.log('CASE delete position 1 and insert x (3) items (start, deleteCount, itemN)')

var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }

console.log(months)
var spliced = splice(months, 1, 1, 'Feb', 'Sep', 'Oct')
console.log(months)
// 
console.log(spliced)
// 