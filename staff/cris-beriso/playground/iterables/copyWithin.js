var copyWithin = function (iterable, target, start, end) {
    /*
    recorrer el iterable de start hasta end (no incluido)
    copiar los a partir de target
    */
    var endIndex = (end === undefined ? iterable.length : end);
    var targetIndex = target
    for (var i = start; i < endIndex; i++) {
        iterable[targetIndex] = iterable[i];
        targetIndex++;
    }
    return iterable;
}

console.log('TEST copyWithin');

console.log('CASE copy to index 0 the element at index 3')

var chars = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
console.log(copyWithin(chars, 0, 3, 4));
// Obj { 0: 'd', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy to index 1 all elements from index 3 to the end')

var chars = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
console.log(copyWithin(chars, 1, 3));
// Obj { 0: 'a', 1: 'd', 2: 'e', 3: 'd', 4: 'e', length: 5 }
